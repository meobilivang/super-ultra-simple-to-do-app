const { chai, server, should, testUser } = require('./testConfig');
const { createToken } = require('../controllers/authController')


describe("Board CRUD", ()=> {

    let TOKEN = null;
    let testTask = {
        "title": "Do laundry",
        "description": "Dont use washing powder! Use Pods"
    }

    describe("/api/auth/login - Log in User", () => {
		it("it should authenticate an exisiting user & retrieve JWT Token", (done) => {
			chai.request(server)
				.post("/api/auth/login")
				.send({ "userName": testUser.userName, "password": testUser.password })
				.then((res) => {

					res.should.have.status(200);
					res.body.should.have.property("message").eql("Successfully Authenticated!");
					TOKEN = res.body.token;

					done();
                }).catch(err => {
                    console.log(err);
                });
		});
	});


    
    describe("/api/tasks/create - Creating new Board", () => {
		it("it should create a new board", (done) => {
            chai.request(server)
                .post("/api/tasks/create")
                .set({ "Authorization": TOKEN })
                .send(testTask)
                .then((res) => {
                    
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("New Board has been created!");
                    testTask.id = res.body.data.id;
                    
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
            });
	});
   
    describe("/api/tasks/update/:id - Board", () => {
		it("it should update 'title' & 'description' of board", (done) => {
            chai.request(server)
                .patch("/api/tasks/update/" + testBoard.id)
                .set({ "Authorization": TOKEN })
                .send({
                    title: "Monday Morning Routine Work From Home Updated",
                    description: "Updated what i do on monday morning while working from home"
                })
                .then((res) => {

                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Existing Board has been updated!");
    
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
            });
	});

    describe("/api/tasks/:id - Board", () => {
		it("it should return the board with defined ID", (done) => {
            chai.request(server)
                .get("/api/tasks/" + testBoard.id)
                .set({ "Authorization": TOKEN })
                .then((res) => {
                    
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Found your Board!");
    
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
            });
	});

    describe("/api/tasks/list - Board", () => {
		it("it should return board list of an User", (done) => {
            chai.request(server)
                .get(`/api/tasks/list`)
                .set({ "Authorization": TOKEN })
                .then((res) => {
    
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.should.have.property("message").eql("Successfully found your Board list");
    
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
            });
	});


    describe("/api/tasks/delete - Delete Board", () => {
		it("it should delete an existing board", (done) => {
            chai.request(server)
                .delete("/api/tasks/delete/" + testBoard.id)
                .set({ "Authorization": TOKEN })
                .then((res) => {
    
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Your Board has been deleted!");
    
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
            });
	});

});