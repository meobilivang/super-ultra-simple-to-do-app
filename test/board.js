const { chai, server, should, testUser } = require('./testConfig');

const testBoard = {
    title: "Monday Morning Routine Work From Home",
    description: "What i do on monday morning while working from home"
}


describe("Board CRUD", ()=> {

    // describe("/api/auth/login - Login user", () => {
	// 	it("it shoud login an user & retrieve JWT Token", (done) => {
    //         chai.request(app)
    //             .post("/api/auth/login")
    //             .send({ "email": testUser.email, "password": testUser.password })
    //             .end((err, res) => {
                    
    //                 res.should.have.status(200);
    //                 res.body.should.have.property("message").eql("Successfully Authenticated!");
    //                 testUser.token = res.body.token;
    
    //                 done();
    //             }).catch(done);
    //         });
	// });
    
    describe("/api/boards/create - Creating new Board", () => {
		it("it shoud create a new board", (done) => {
            chai.request(app)
                .post("/api/boards/create")
                .set({ "Authorization": `${testUser.token}` })
                .send(testBoard)
                .end((err, res) => {
    
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("New Board has been created!");
                    testBoard.id = res.body.id;

                    done();
                })
                .catch(done);
            });
	});
   
    describe("/api/boards/update/:id - Board", () => {
		it("it shoud ", (done) => {
            chai.request(app)
                .update("/api/boards")
                .set({ "Authorization": `${testUser.token}` })
                .send({
                    title: "Monday Morning Routine Work From Home Updated",
                    description: "Updated hat i do on monday morning while working from home"
                })
                .end((err, res) => {
    
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Existing Board has been updated!");
    
                    done();
                })
                .catch(done);
            });
	});

    describe("/api/boards/:id - Board", () => {
		it("it shoud return the board with defined ID", (done) => {
            chai.request(app)
                .get(`/api/boards/${testBoard.id}`)
                .set({ "Authorization": `${testUser.token}` })
                .end((err, res) => {
    
                    res.should.have.status(200);
                    res.body.
                    res.body.should.have.property("message").eql("");
    
                    done();
                })
                .catch(done);
            });
	});


    describe("/api/boards/delete - Delete Board", () => {
		it("it shoud delete an existing board", (done) => {
            chai.request(app)
                .delete("/api/boards")
                .set({ "Authorization": `${testUser.token}` })
                .send({
                    
                })
                .end((err, res) => {
    
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("");
    
                    done();
                })
                .catch(done);
            });
	});

});