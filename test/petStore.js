import supertest from 'supertest';
const request = supertest('https://petstore.swagger.io/v2');

import { expect } from 'chai';

describe('Pet Store', () => {
 const petId = 2929;

  it('POST /Add A NEW PET', () => {
    const data = {
      "id": `${petId}`,
      "category": {
        "id": 0,
        "name": "string"
      },
      "name": "doggie",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "status": "available"
    };

    return request.post(`/pet`).send(data).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.not.eq(null)
    });

  });

  it('GET /FIND PET BY PET ID', () => {
    return request.get(`/pet/${petId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(petId, 'Find pet - Pet id not matching')
    });
  });

  
  it('PUT /UPDATE EXISTING PET NAME', () => {
     
   const newPetName = Math.random().toString(36).substring(3,9);

    const data = {
      "id": `${petId}`,
      "category": {
        "id": 0,
        "name": "string"
      },
      "name": `${newPetName}`,
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "status": "available"
    };


    return request.put(`/pet`).send(data).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq(newPetName)
    });

  });


  it('DELETE /DELETE A PET', () => {
    return request.delete(`/pet/${petId}`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('GET /TRY TO FIND DELETED PET _ NEGETIVE TEST', () => {
    return request.get(`/pet/${petId}`).then((res) => {
      expect(res.status).to.eq(404, 'Deleted pet ID:'+ petId+' is still avilable.' ) ;
    });
  });

});