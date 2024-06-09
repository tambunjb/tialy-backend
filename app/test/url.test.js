let mongoose = require("mongoose");
let Url = require('../models/Url');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
const email = 'tambunjonathanb@gmail.com'
let auth = 'Bearer '
const slug = 'test'

describe('Url', () => {

  describe('/POST user/register', () => {
    it('it should register a user to get token ', (done) => {
      chai.request(server)
        .post('/user/register')
        .send({email: email})
        .end((err, res) => {
          res.should.have.status(200);
          auth += res.text
          done();
        });
    });
  });
  
  describe('/POST admin/urls', () => {
    it('it should POST a url ', (done) => {
      let url = {
          slug: slug,
          original: 'https://www.google.com/'
      }
      chai.request(server)
        .post('/admin/urls')
        .set('Authorization', auth)
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('original');
          res.body.should.have.property('slug');
          done();
        });
    });
  });

  describe('/GET admin/urls', () => {
    it('it should GET all the urls', (done) => {
      chai.request(server)
        .get('/admin/urls')
        .set('Authorization', auth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('/PUT admin/urls/:slug', () => {
    it('it should UPDATE a url given the slug', (done) => {
      chai.request(server)
        .put('/admin/urls/' + slug)
        .set('Authorization', auth)
        .send({original: "https://www.google.co.uk/"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Url updated!');
          done();
        });
    });
  });

  describe('/GET admin/urls/:slug', () => {
    it('it should GET a url by the given slug', (done) => {
      chai.request(server)
        .get('/admin/urls/' + slug)
        .set('Authorization', auth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('slug');
          res.body.should.have.property('original');
          res.body.should.have.property('slug').eql(slug);
          done();
        });
    });
  });
  
  describe('/DELETE admin/urls/:slug', () => {
    it('it should DELETE a url given the slug', (done) => {
      chai.request(server)
        .delete('/admin/urls/' + slug)
        .set('Authorization', auth)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Url deleted!');
          done();
        });
    });
  });

  describe('/DELETE db/empty', (done) => {
    it('it should empty the db', (done) => {
      chai.request(server)
        .delete('/db/empty')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

});
