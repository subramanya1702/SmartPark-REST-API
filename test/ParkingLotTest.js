process.env.NODE_ENV = 'test';

const RecentParkingLot = require('../model/RecentParkingLots');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const fs = require('fs');
let parkingLotOne = new RecentParkingLot();
let parkingLotTwo = new RecentParkingLot();

chai.should();
chai.use(chaiHttp);

describe('Parking Lot Test', () => {
    before((done) => {
        cleanUpDatabase().then(() => {
            populateDummyRecords().then(() => {
                done();
            });
        });
    });

    describe('GET recent parking lots', () => {
        it('it should get all recent parking lots', (done) => {
            chai
                .request(app)
                .get('/parking_lots')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.parking_lots.should.be.a('array');
                    res.body.parking_lots.length.should.be.eql(2);
                    done();
                });
        });
    });

    describe('GET original image with a valid parking lot id', () => {
        it('it should get an original image of the parking lot using parking lot id', (done) => {
            chai
                .request(app)
                .get(`/parking_lots/${parkingLotOne.id.toString()}/image?type=originalImage`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.be.eq('image/jpeg');
                    res.body.should.be.instanceof(Buffer);
                    done();
                });
        });
    });

    describe('GET labelled image with a valid parking lot id', () => {
        it('it should get a labelled image of the parking lot using parking lot id', (done) => {
            chai
                .request(app)
                .get(`/parking_lots/${parkingLotOne.id.toString()}/image?type=labelledImage`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.be.eq('image/jpeg');
                    res.body.should.be.instanceof(Buffer);
                    done();
                });
        });
    });

    describe('GET image with an invalid parking lot id', () => {
        it('it should throw 400 error', (done) => {
            chai
                .request(app)
                .get(`/parking_lots/${parkingLotOne.id.toString() + '1'}/image`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.be.eq(`Invalid Id. Document with id: ${parkingLotOne.id.toString() + '1'} does not exists.`);
                    done();
                });
        });
    });

    after((done) => {
        cleanUpDatabase().then(() => {
            done();
        });
    });
});

/**
 * Clean up the database
 * @return {Promise}
 */
function cleanUpDatabase() {
    return RecentParkingLot.deleteMany({});
}

/**
 * Populate dummy records to the database
 * @return {Promise}
 */
function populateDummyRecords() {
    const bufferOne = fs.readFileSync(__dirname + '/Parking lot one.jpeg');
    parkingLotOne = new RecentParkingLot({
            id: '55544f13-fbc4-434a-b0c2-d9428e24163f',
            latitude: '51.22',
            longitude: '-51.22',
            name: 'Lot 1',
            emptySpaces: 0,
            totalSpaces: 20,
            timestamp: 14354545,
            ogImage: bufferOne,
            predImage: bufferOne,
            timeLimit: '9:30AM to 5:30PM',
            charges: 2,
        },
    );

    const bufferTwo = fs.readFileSync(__dirname + '/Parking lot two.jpeg');
    parkingLotTwo = new RecentParkingLot({
            id: '45544f13-fbc4-434a-b0c2-d9428e24162f',
            latitude: '41.22',
            longitude: '-41.22',
            name: 'Lot 2',
            emptySpaces: 10,
            totalSpaces: 30,
            timestamp: 15354545,
            ogImage: bufferTwo,
            predImage: bufferTwo,
            timeLimit: '9:30AM to 5:30PM',
            charges: 2.5,
        },
    );

    return Promise.all([parkingLotOne.save(), parkingLotTwo.save()]);
}
