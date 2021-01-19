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

## Feedback / Notes

Re: <https://github.com/Outsmart-OOH/ooh_open_direct/blob/master/docs/v1-1/OpenDirect_OOH_1-5-1_v1-1.md#71-uri-summary-table>
* `?$filter=` is used for several resources and sub-resources (i.e. `accounts`, `assignments`, `creatives`, `orders`, `organizations`, `changerequests`, `changerequest lines`, `advertiserbrands`, `datasources`): This parameter is missing for `orders lines`, should it be added?
* `GET`, `PATCH`, `DELETE` are specified as accepted verbs for a blank line that sits between `/accounts/{id}/orders` and `/accounts/{id}/orders`: Is the intention for these verbs to apply to the `/accounts/{id}/orders` resource?
* For `/accounts/{id}/assignments/{id}` an action is defined for `disable`, but this is specified as a query parameter and the `PATCH` verb is used: This is not consistent with actions specified for change requests - suggest changing so that each action is part of the URI and the `PUT` or `POST` verb be used instead:
  * `PUT` `/accounts/{id}/assignments/{id}/disable`
* For `/accounts/{id}/orders/{id}/lines/{id}`, several actions are defined, but they are specified as query parameters and modified using the `PATCH` verb: This is not consistent with actions specified for changerequests - suggest changing so that each action is part of the URI and the `PUT` or `POST` verb be used instead:
  * `PUT` `/accounts/{id}/orders/{id}/lines/{id}/book`
  * `PUT` `/accounts/{id}/orders/{id}/lines/{id}/reserve`
  * `PUT` `/accounts/{id}/orders/{id}/lines/{id}/cancel`
  * `PUT` `/accounts/{id}/orders/{id}/lines/{id}/reset`
* The changerequests URI should be pluralized for proper consistency and for REST best practices: Specify `/accounts/{id}/changerequests`, `/accounts/{id}/changerequests/{id}`, etc.
* Consider adding a `DELETE` verb for changerequests lines: `DELETE` `/accounts/{id}/changerequests/{id}/lines/{id}` for consistency with other parts of the API (i.e. changerequests, orders, order lines)
* Under reporting, `/accounts/{id}/orders/{id}/lines/stats` is defined as a supported URI: This is problematic because the `stats` action could actually be misattributed as the identifier for an order line in an implementation; recommend removing this entirely as `/acounts/{id}/orders/{id}/lines/{id}/stats` is also explicitly defined

### JSON Schema Errors

<https://github.com/Outsmart-OOH/ooh_open_direct/pull/20>

* `line_object.json` - the `$id` values for `Comment`, `Cost`, `OrderId`, `ProductId`, `ProviderData`, `ReservedExpiryDate`, `StartDate`, `StateChangeReason`, `Stats`, `ProductUnAvails`, and `ProductAvails` were incorrect (name conflicts)
* `product_object.json` - the `$id` value for `Geometry` was incorrect (name collision)
* `stats_object.json` - the `$id` for all fields were incorrect (name conflicts)

