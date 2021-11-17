const Leaderboard = require('../../../models')
const pg = require('pg')
jest.mock('pg')

const db = require('../../../db_config')

describe ('Leaders', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.clearAllMocks())

    describe('all', () => {
        test('it resolves with leaderboard on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}, {}, {}, {}, {}, {}, {}]});
            const all = await Leaderboard.all;
            expect(all).toHaveLength(9)
        })
    });

    describe('create', () => {
        test('it resolves with a new entry on successful db query', async () => {
            let leaderData = { id: 1, name: 'Test 1', topic: 'Science', difficulty: 'Hard', score: 6 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ leaderData ] });
            const result = await Leaderboard.create('New Entry');
            expect(result).toBeInstanceOf(Leaderboard)
        })
    });
})