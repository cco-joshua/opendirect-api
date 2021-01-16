import countdown from 'countdown';
import fs from 'fs';
import path from 'path';
import { Request } from 'reqlib';
import { Validator } from 'jsonschema';
import { parse, URL } from 'url';

export default async (app, self = {}) => {
  function createValidator (schemaName, schemaJSON) {
    return new Promise((resolve, reject) => {
      let validator = new Validator();

      app.log.debug('models.validators: creating JSON Schema validator for %s', schemaName);

      validator.addSchema(schemaJSON);

      app.log.debug(validator.unresolvedRefs);

      return Promise.all((validator.unresolvedRefs || []).map((schemaURI) => new Promise((resolve, reject) => {
        if (!schemaURI) {
          return resolve();
        }

        let
          begin = new Date(),
          options = new URL(schemaURI),
          req = new Request(options);

        app.log.trace('models.validators: loading external schema %s', schemaURI);

        return req
          .get()
          .then((result) => {
            app.log.trace(result);

            // add to schema

            app.log.trace(
              'models.validators: completed loading external schema %s in %s', 
              schemaURI,
              countdown(begin, new Date(), countdown.MILLISECONDS));
    
            return resolve();
          })
          .catch(reject);

      }))).then(() => resolve(validator)).catch(reject);
    }); 
  }
  
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
    let
      schemaName = path.basename(schema, '_object.json'), 
      schemaPath = path.join(app.settings.models.schemaPath, schema);

    app.log.debug('models.validators: loading OpenDirect JSON schema from %s', schemaPath);

    return readJSON(schemaPath)
      .then((schemaJSON) => createValidator(schemaPath, schemaJSON))
      .then((validator) => {
        self[schemaName] = (model) => {
          app.log.debug('models.validators: validating model against schema for %s', schemaName);

          return validator.validate(model, schemaJSON);
        };
      })
      .then(resolve)
      .catch(reject);
  })));

  return self;
};