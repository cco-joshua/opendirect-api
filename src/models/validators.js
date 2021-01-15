import countdown from 'countdown';
import fs from 'fs';
import path from 'path';
import { validate } from 'jsonschema';

export default async (app, self = {}) => {
  function findSchemas (schemaPath) {
    return new Promise((resolve, reject) => {
      let begin = new Date();

      app.log.trace('models.validators: listing schema files at path %s', schemaPath);
      
      return fs.readdir(schemaPath, (err, schemas) => {
        if (err) {
          return reject(err);
        }

        app.log.trace(
          'models.validators: found %d schema files at path %s in %s',
          schemas.length,
          schemaPath,
          countdown(begin, new Date(), countdown.MILLISECONDS));

        return resolve(schemas);
      });
    });
  }

  function readJSON (filePath) {
    return new Promise((resolve, reject) => {
      let
        begin = new Date(),
        chunks = [], 
        reader = fs.createReadStream(filePath);
      
      app.log.trace('models.validators: beginning to read JSON schema from %s', filePath);
      
      reader.on('data', (chunk) => chunks.push(chunk));

      reader.on('end', () => {
        app.log.trace(
          'models.validators: completed reading JSON schema from %s in %s',
          filePath,
          countdown(begin, new Date(), countdown.MILLISECONDS));

        try {
          return resolve(JSON.parse(chunks.join('')));
        } catch (ex) {
          ex.message = `models.validators: unable to parse schema from ${filePath}: ${ex.message}`;
          return reject(ex);
        }
      });

      reader.on('error', reject);
    });
  }

  let schemas;

  app.log.debug('models.validators: retrieving list of available OpenDirect schemas');
  schemas = await findSchemas(app.settings.models.schemaPath);

  // load the JSON schema files for each file found and create a JSON schema validator
  await Promise.all(schemas.map((schema) => new Promise((resolve, reject) => {
    let schemaPath = path.join(app.settings.models.schemaPath, schema);
    app.log.debug('models.validators: loading OpenDirect JSON schema from %s', schemaPath);

    return readJSON(schemaPath)
      .then((schemaJSON) => {
        let schemaName = path.basename(schema, '_object.json');

        app.log.debug('models.validators: creating JSON Schema validator for %s', schemaName);

        self[schemaName] = (model) => {
          app.log.trace('models.validators: validating model against schema for %s', schemaName);
          return validate(model, schemaJSON);
        };

        return resolve();
      })
      .catch(reject);
  })));

  return self;
};