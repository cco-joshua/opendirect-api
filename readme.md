# OpenDirect OOH

## Getting Started

### Prerequisites

* Docker
* Git
* MongoDB
* Node (LTS recommended)

### Git Repository

```bash
git clone git@github.com:cco-joshua/opendirect-api.git
cd opendirect-api
```

### MongoDB 

MongoDB is required for data storage... perhaps the most simple way to get this running is via Docker:

```bash
mkdir -p .mongo
docker run -d -p 27017:27017 --name opendirect-mongo -v $PWD/.mongo:/data/db mongo
```

### Node Setup

Install the dependencies using `npm` from the root of the repository:

```bash
npm i
```

### Start API Server

Gulp is used to watch the file system for changes, recompile and reload the API. To begin the development workflow server, simply execute the `npm start` command as follows from the root of the repository:

```bash
npm start
```