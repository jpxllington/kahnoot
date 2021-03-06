const leaderController = require('../../../controllers')
const Leaderboard = require('../../../models')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('leaders controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', ()=> {
        test('it returns the leaderboard with a 200 status code', async () => {
            jest.spyOn(Leaderboard, 'all', 'get')
                 .mockResolvedValue(['Testing 1', 'Testing 2']);
            await leaderController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['Testing 1', 'Testing 2']);

        })
    });

    describe('show', () => {
        test('it returns a leaderboard entry with a 200 status code', async () => {
            let testLeaderboard = {
                id: 1, name: 'Test Name', 
                topic: 'Test topic',
                difficulty: 'Easy', 
                score: 5
            }
            jest.spyOn(Leaderboard, 'findByName')
                .mockResolvedValue(new Leaderboard(testLeaderboard));
                
            const mockReq = { params: { name: 'Test Name' } }
            await leaderController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Leaderboard(testLeaderboard));
        })

        test('it returns an error with a 404 status code', async () => {
            jest.spyOn(Leaderboard, 'findByName')
                .mockRejectedValue('Invalid username');
                
            const mockReq = { params: { name: 'Test Name' } }
            await leaderController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({err: 'Invalid username'});
        });
    });

    describe('create', () => {
        test('it returns a new leaderboard entry with a 201 status code', async () => {
            let testLeaderboard = {
                id: 2, name: 'Test Name2', 
                topic: 'Test topic2',
                difficulty: 'Medium', 
                score: 7
            }
            jest.spyOn(Leaderboard, 'create')
                    .mockResolvedValue(new Leaderboard(testLeaderboard));
                
            const mockReq = { body: testLeaderboard }
            await leaderController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Leaderboard(testLeaderboard));
        });

        test('it returns an error with a 422 status code', async () => {
            let testLeaderboard = {
                id: 2, name: 'Test Name2', 
                topic: 'Test topic2',
                difficulty: 'Medium', 
                score: 7 
            }
            jest.spyOn(Leaderboard, 'create')
                .mockRejectedValue('Error creating entry');
                
            const mockReq = { body: testLeaderboard }
            await leaderController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(422);
            expect(mockJson).toHaveBeenCalledWith({err: 'Error creating entry'});
        });
    });
})