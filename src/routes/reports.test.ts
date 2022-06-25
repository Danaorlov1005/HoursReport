import router from './reports';
import request from 'supertest';

describe("Test the root path", () => {
    test("It should response the POST method", (done) => {
       request(router)
        .post("/reports").send({
          employeeName:"steve",
          startHour:"17/04/2013 01:30:26",
          endHour:"17/04/2013 06:30:26"
        })
        .expect(200);
        done();
    });
    
    test("It should response the POST method", (done) => {
      request(router)
       .post("/reports").send({
         employeeName:"steve",
         startHour:"3",
         endHour:"5"
       })
       .expect(400);
       done();
   });
  });