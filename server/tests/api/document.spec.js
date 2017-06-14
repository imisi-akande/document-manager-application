import request from 'supertest';
import chai from 'chai';
import app from '../../config/app';
import db from '../../models';
import helper from '../Helpers/test.helper';

const superRequest = request.agent(app);
const expect = chai.expect;

const publicDocs = helper.publicDocument;
const privateDocs = helper.privateDocument;
const privateDocum = helper.privateDocuments;
const roleDocs = helper.roleDocument;
let invalidDoc = helper.invalidDocument;
let publicDoc = helper.publicDocuments;

const compareDates = (firstDate, secondDate) =>
  new Date(firstDate).getTime() <= new Date(secondDate).getTime();

describe('DOCUMENT API', () => {
  let adminToken, regularToken, regularToken2;
  let regularUser, regularUser2;
  let createdDoc, roleDocument, privateDocument;
  let document, updateDoc;

  before((done) => {
    db.Roles.bulkCreate([helper.adminRole, helper.regularRole])
      .then((roles) => {
        helper.adminUser1.roleId = roles[0].id;
        db.Users.create(helper.adminUser1)
          .then(() => {
            superRequest.post('/api/users/login')
              .send(helper.adminUser1)
              .end((err, res1) => {
                adminToken = res1.body.token;
                superRequest.post('/api/users')
                  .send(helper.regularUser1)
                  .end((err, res2) => {
                    regularUser = res2.body.user;
                    regularToken = res2.body.token;
                    superRequest.post('/api/users')
                      .send(helper.regularUser2)
                      .end((err, res3) => {
                        regularUser2 = res3.body.user;
                        regularToken2 = res3.body.token;
                        done();
                      });
                  });
              });
          });
      });
  });

  after(() => {
    db.Roles.destroy({
      where: {}
    });
  });

  describe('CREATE DOCUMENT POST /documents', () => {
    it('should create a new document', (done) => {
      superRequest.post('/api/documents')
        .send(publicDocs)
        .set({
          Authorization: regularToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal(publicDocs.title);
          expect(res.body.authorId).to.equal(regularUser.id);
          expect(res.body.access).to.equal(publicDocs.access);
          done();
        });
    });

    it('should not create document when title is not supplied', (done) => {
      superRequest.post('/api/documents/')
        .send(invalidDoc)
        .set({
          Authorization: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Title field is required');
          done();
        });
    });

    it('should not create document when content is not supplied', (done) => {
      invalidDoc = {
        title: 'new document'
      };
      superRequest.post('/api/documents')
        .send(invalidDoc)
        .set({
          Authorization: adminToken
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Content field is required');
          done();
        });
    });

    it('should not create document when the access status supplied is unknown',
      (done) => {
        invalidDoc = {
          title: 'the Word',
          content: 'Lion of the Judah',
          access: 'strange'
        };
        superRequest.post('/api/documents')
          .send(invalidDoc)
          .set({
            Authorization: adminToken
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to
              .equal('Access type can only be public, private or role');
            done();
          });
      });

    describe('Update Document /documents/:id', () => {
      before((done) => {
        superRequest.post('/api/documents')
          .send(privateDocs)
          .set({
            Authorization: regularToken
          })
          .end((err, res) => {
            createdDoc = res.body;
            done();
          });
      });

      it('should update document when user is the owner', (done) => {
        updateDoc = {
          title: 'andela'
        };
        superRequest.put(`/api/documents/${createdDoc.id}`)
          .send(updateDoc)
          .set({
            Authorization: regularToken
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.updatedDocument.title).to
            .equal(updateDoc.title);
            expect(res.body.updatedDocument.content).to
            .equal(createdDoc.content);
            done();
          });
      });

      it('should allow admin to update document', (done) => {
        updateDoc = {
          title: 'Growth'
        };
        superRequest.put(`/api/documents/${createdDoc.id}`)
          .send(updateDoc)
          .set({
            Authorization: adminToken
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.updatedDocument.title).to
            .equal(updateDoc.title);
            expect(res.body.updatedDocument.content).to
            .equal(createdDoc.content);
            done();
          });
      });

      it('should not update document when user is not the owner', (done) => {
        updateDoc = {
          content: 'new life, new culture, new community'
        };
        superRequest.put(`/api/documents/${createdDoc.id}`)
          .send(updateDoc)
          .set({
            Authorization: regularToken2
          })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
              .to.equal('You are not permitted to modify this document');
            done();
          });
      });

      it('should return NOT FOUND when invalid id is provided', (done) => {
        updateDoc = {
          content: 'new life, new culture, new community'
        };
        superRequest.put('/api/documents/78456')
          .send(updateDoc)
          .set({
            Authorization: regularToken2
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('This document does not exist');
            done();
          });
      });

      describe('Delete Document DELETE /documents/:id', () => {
        beforeEach((done) => {
          superRequest.post('/api/documents')
            .send(privateDocs)
            .set({
              Authorization: regularToken2
            })
            .end((err, res) => {
              document = res.body;
              done();
            });
        });

        it('should allow document(s) owner to delete document', (done) => {
          superRequest.delete(`/api/documents/${document.id}`)
            .set({
              Authorization: regularToken2
            })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message)
                .to.equal('This document has been deleted successfully');
              done();
            });
        });

        it('should allow admin to delete any document', (done) => {
          superRequest.delete(`/api/documents/${document.id}`)
            .set({
              Authorization: adminToken
            })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to
                .equal('This document has been deleted successfully');
              done();
            });
        });

        it('should not delete document if requester is not the owner or admin',
          (done) => {
            superRequest.delete(`/api/documents/${document.id}`)
              .set({
                Authorization: regularToken
              })
              .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message).to
                  .equal('You are not permitted to modify this document');
                done();
              });
          });

        it('should return NOT FOUND for invalid id', (done) => {
          superRequest.delete('/api/documents/94567')
            .set({
              Authorization: regularToken2
            })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('This document does not exist');
              done();
            });
        });

        describe('GET document /documents/:id', () => {
          describe('GET document with PRIVATE access', () => {
            before((done) => {
              superRequest.post('/api/documents')
                .send(privateDocum)
                .set({
                  Authorization: regularToken
                })
                .end((err, res) => {
                  privateDocument = res.body;
                  done();
                });
            });

            it('should ONLY return the document when the user is the author',
              (done) => {
                superRequest.get(`/api/documents/${privateDocument.id}`)
                  .set({
                    Authorization: regularToken
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to
                      .equal('You have successfully retrieved this document');
                    expect(res.body.document.title).to
                    .equal(privateDocument.title);
                    expect(res.body.document.access).to
                    .equal('private');
                    expect(res.body.document.authorId).to
                    .equal(regularUser.id);
                    done();
                  });
              });

            it('should allow admin to retrieve document with private access level', // eslint-disable-line max-len
              (done) => {
                superRequest.get(`/api/documents/${privateDocument.id}`)
                  .set({
                    Authorization: adminToken
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to
                      .equal('You have successfully retrieved this document');
                    expect(res.body.document.title).to
                    .equal(privateDocument.title);
                    expect(res.body.document.access).to
                    .equal('private');
                    done();
                  });
              });

            it('should NOT return document when user is not the author',
             (done) => {
               superRequest.get(`/api/documents/${privateDocument.id}`)
                .set({
                  Authorization: regularToken2
                })
                .end((err, res) => {
                  expect(res.status).to.equal(401);
                  expect(res.body.message).to
                    .equal('You are not permitted to view this document');
                  done();
                });
             });

            describe('PUBLIC DOCUMENT', () => {
              before((done) => {
                superRequest.post('/api/documents')
                  .send(publicDoc)
                  .set({
                    Authorization: regularToken2
                  })
                  .end((err, res) => {
                    publicDoc = res.body;
                    done();
                  });
              });

              it('should return document to all users', (done) => {
                superRequest.get(`/api/documents/${publicDoc.id}`)
                  .set({
                    Authorization: regularToken
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.document.title).to.equal(publicDoc.title);
                    expect(res.body.document.access).to.equal('public');
                    expect(res.body.message).to
                      .equal('You have successfully retrieved this document');
                    done();
                  });
              });

              it('should return document not found when invalid id is supplied',
                (done) => {
                  superRequest.get('/api/documents/456387')
                    .set({
                      Authorization: regularToken
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(404);
                      expect(res.body.message).to
                      .equal('This document cannot be found');
                      done();
                    });
                });
            });

            describe('ROLE ACCESS DOCUMENT', () => {
              let guestToken;
              before((done) => {
                db.Roles.create(helper.guestRole1)
                  .then((guestRole) => {
                    helper.secondUser.roleId = guestRole.id;
                    superRequest.post('/api/users')
                      .send(helper.secondUser)
                      .end((error, response) => {
                        guestToken = response.body.token;
                        superRequest.post('/api/documents')
                          .send(roleDocs)
                          .set({
                            Authorization: adminToken
                          })
                          .end((err, res) => {
                            roleDocument = res.body;
                            done();
                          });
                      });
                  });
              });

              it('should allow admin to view all role level access documents',
                (done) => {
                  superRequest.get(`/api/documents/${roleDocument.id}`)
                    .set({
                      Authorization: adminToken
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      expect(res.body.document.title).to
                        .equal(roleDocument.title);
                      expect(res.body.document.access).to.equal('role');
                      expect(res.body.message).to
                        .equal('You have successfully retrieved this document');
                      done();
                    });
                });

              describe('GET ALL DOCUMENT PAGINATION', () => {
                it('should return all documents to admin user', (done) => {
                  superRequest.get('/api/documents')
                    .set({
                      Authorization: adminToken
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      expect(res.body.message).to
                        .equal('You have successfully retrieved all documents');
                      res.body.documents.rows.forEach((doc) => {
                        expect(doc.access).to.be
                        .oneOf(['role', 'private', 'public']);
                      });
                      done();
                    });
                });

                it('should return all documents with pagination', (done) => {
                  superRequest.get('/api/documents?limit=4&offset=3')
                    .set({
                      Authorization: adminToken
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      expect(res.body.pagination.page_count).to.equal(2);
                      expect(res.body.pagination.page).to.equal(1);
                      expect(res.body.pagination.page_size).to.equal(4);
                      expect(res.body.pagination.total_count).to.equal(6);
                      done();
                    });
                });

                it(`should return all documents in descending order of 
                their respective published date`, (done) => {
                  superRequest.get('/api/documents')
                    .set({
                      Authorization: adminToken
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      for (let i = 0; i < res.body.documents.rows
                      .length - 1; i += 1) {
                        const flag = compareDates(
                          res.body.documents.rows[i].createdAt,
                          res.body.documents.rows[1 + i].createdAt
                        );
                        expect(flag).to.equal(false);
                      }
                      done();
                    });
                });
              });

              describe('DOCUMENT SEARCH PAGINATION', () => {
                it('should return all search results to admin',
                  (done) => {
                    superRequest.get(`/api/search/documents?q=
                  ${publicDocs.content.substr(2, 6)}`)
                      .set({
                        'x-access-token': adminToken
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(200);
                        res.body.documents.rows.forEach((doc) => {
                          expect(doc.access).to.be
                          .oneOf(['public', 'role', 'private']);
                        });
                        done();
                      });
                  });

                it('should allow multiple search terms', (done) => {
                  superRequest.get(`/api/search/documents?q=
                    ${publicDocs.content.substr(2, 6)} 
                    ${publicDocs.title.substr(1, 6)}`)
                    .set({
                      'x-access-token': regularToken2
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      res.body.documents.rows.forEach((doc) => {
                        if (doc.authorId === regularUser2.id) {
                          expect(doc.access).to.be
                          .oneOf(['public', 'role', 'private']);
                        } else {
                          expect(doc.access).to.be.oneOf(['public', 'role']);
                        }
                      });
                      done();
                    });
                });

                it('should return all documents with pagination', (done) => {
                  superRequest.get(`/api/search/documents?q=
                  ${publicDocs.content.substr(2, 6)} 
                  ${publicDocs.title.substr(1, 6)}`)
                    .set({
                      'x-access-token': adminToken
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      expect(res.body.pagination.page_count)
                      .to.be.greaterThan(0);
                      expect(res.body.pagination.page)
                      .to.be.greaterThan(0);
                      expect(res.body.pagination.page_size)
                      .to.greaterThan(0);
                      expect(res.body.pagination.total_count)
                      .to.be.greaterThan(0);
                      done();
                    });
                });

                it('should return error for negative limit', (done) => {
                  superRequest.get(`/api/search/documents?q=
                    ${publicDocs.content.substr(2, 6)}&limit=-2`)
                    .set({
                      'x-access-token': regularToken2
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(400);
                      expect(res.body.message).to
                        .equal('Only positive number is allowed for limit value');// eslint-disable-line max-len
                      done();
                    });
                });

                it('should return error for negative offset', (done) => {
                  superRequest.get(`/api/search/documents?q=
                  ${publicDocs.content.substr(2, 6)}&limit=2&offset=-2`)
                    .set({
                      'x-access-token': regularToken2
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(400);
                      expect(res.body.message).to
                        .equal('Only positive number is allowed for offset value'); // eslint-disable-line max-len
                      done();
                    });
                });

                it('should return error when limit entered is string',
                 (done) => {
                   superRequest.get(`/api/search/documents?q=
                  ${publicDocs.content.substr(2, 6)}&limit=aaa`)
                    .set({
                      'x-access-token': regularToken2
                    })
                    .end((err, res) => {
                      expect(res.status).to.equal(400);
                      expect(res.body.message).to
                        .equal('Only positive number is allowed for limit value');// eslint-disable-line max-len
                      done();
                    });
                 });

                it('should return documents in order of their respective published date', // eslint-disable-line max-len
                  (done) => {
                    superRequest.get(`/api/search/documents?q=
                    ${publicDocs.content.substr(2, 6)}&publishedDate=DESC`)
                      .set({
                        'x-access-token': regularToken2
                      })
                      .end((err, res) => {
                        for (let i = 0; i < res.body.documents
                        .rows.length - 1; i += 1) {
                          const flag = compareDates(
                            res.body.documents.rows[i].createdAt,
                            res.body.documents.rows[1 + i].createdAt
                          );
                          expect(flag).to.equal(false);
                        }
                        done();
                      });
                  });

                it('should return documents in ascending order of published date', // eslint-disable-line max-len
                  (done) => {
                    superRequest.get(`/api/search/documents?q=
                      ${publicDocs.content.substr(2, 6)}&publishedDate=ASC`)
                      .set({
                        'x-access-token': regularToken2
                      })
                      .end((err, res) => {
                        for (let i = 0; i < res.body.documents
                        .rows.length - 1; i += 1) {
                          const flag = compareDates(
                            res.body.documents.rows[i].createdAt,
                            res.body.documents.rows[1 + i].createdAt
                          );
                          expect(flag).to.equal(true);
                        }
                        done();
                      });
                  });

                describe('Fetch all user\'s document', () => {
                  it('should return all documents created by a particular user',
                  (done) => {
                    superRequest.get(`/api/users/${regularUser.id}/documents`)
                      .set({
                        'x-access-token': regularToken
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.userDocuments.user.id).to
                        .equal(regularUser.id);
                        expect(res.body.documents.rows.length)
                          .to.be.greaterThan(0);
                        res.body.documents.rows.forEach((doc) => {
                          expect(doc.access).to.be
                          .oneOf(['public', 'role', 'private']);
                        });
                        done();
                      });
                  });

                  it('should return all documents created by a particular user to admin user', // eslint-disable-line max-len
                    (done) => {
                      superRequest.get(`/api/users/${regularUser.id}/documents`)
                        .set({
                          'x-access-token': adminToken
                        })
                        .end((err, res) => {
                          expect(res.status).to.equal(200);
                          expect(res.body.userDocuments.user.id)
                          .to.equal(regularUser.id);
                          expect(res.body.documents.rows.length)
                            .to.be.greaterThan(0);
                          res.body.documents.rows
                          .forEach((doc) => {
                            expect(doc.access).to.be
                            .oneOf(['public', 'role', 'private']);
                          });
                          done();
                        });
                    });

                  it(`should return all public or role access level
                      documents to a requester user`, (done) => {
                    superRequest.get(`/api/users/${regularUser.id}/documents`)
                      .set({
                        'x-access-token': regularToken2
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.userDocuments.user.id).to
                        .equal(regularUser.id);
                        res.body.documents.rows
                        .forEach((doc) => {
                          expect(doc.access).to.be.oneOf(['role', 'public']);
                        });
                        done();
                      });
                  });

                  it('should return no document found for invalid id',
                   (done) => {
                     superRequest.get('/api/users/0/documents')
                      .set({
                        'x-access-token': regularToken
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(404);
                        expect(res.body.message).to
                        .equal('This user does not exist');
                        done();
                      });
                   });
                });
              });
            });
          });
        });
      });
    });
  });
});
