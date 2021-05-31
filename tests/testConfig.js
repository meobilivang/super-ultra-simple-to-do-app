process.env.NODE_ENVIRONMENT = "test"

/**
 * Packages for Unit Tests
 *
 */

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app")

let should =  chai.should();

chai.use(chaiHttp);

module.exports = {
	chai,
	app,
	should
}
