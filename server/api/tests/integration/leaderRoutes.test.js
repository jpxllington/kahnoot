describe ('leader endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Stopping test server')
        await api.close()
    })

    it('should return a list of players in the leaderboard', async () => {
        const res = await request(api).get('/leaderboard');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toHaveLength(3);
    });
})