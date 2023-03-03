const { sequelize } = require('./db');
const { User, Board, Cheese } = require('./models/index');

describe("Cheese board project", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test("can create a User", async () => {
        let user = await User.create({
            name: "Nathan",
            email: "nathan@gmail.com"
        });
        
        expect(user.name).toBe("Nathan");
        expect(user instanceof User).toBeTruthy();
    });

    test("can create a Board", async () => {
        let board = await Board.create({
            type: "hard",
            description: "hard cheeses",
            rating: 8
        });

        expect(board.type).toBe("hard");
        expect(board).toHaveProperty("description", "hard cheeses");
    });

    test("can create a Cheese", async () => {
        let cheese = await Cheese.create({
            title: "parmesan",
            description: "hard, gritty, fruity"
        });

        expect(cheese.title).toBe("parmesan");
        expect(cheese.description).toBe("hard, gritty, fruity");
    });

    test("multiple Boards can be added to a User", async () => {
        let nathan = await User.create({
            name: "Nathan",
            email: "nathan@gmail.com"
        });

        let hardBoard = await Board.create({
            type: "hard",
            description: "hard cheeses",
            rating: 8
        });

        let softBoard = await Board.create({
            type: "soft",
            description: "soft cheeses",
            rating: 9
        });

        await nathan.addBoard([hardBoard, softBoard]);

        let nathansBoards = await nathan.getBoards();
        expect(nathansBoards.length).toBe(2);
        expect(nathansBoards[0] instanceof Board).toBeTruthy();
        expect(nathansBoards[1].type).toBe("soft");
    });

    test("testing many-to-many relationship between Cheese and Board", async () => {
        let hardBoard = await Board.create({
            type: "hard",
            description: "hard cheeses",
            rating: 8
        });

        let softBoard = await Board.create({
            type: "soft",
            description: "soft cheeses",
            rating: 9
        });

        let parmesan = await Cheese.create({
            title: "parmesan",
            description: "hard, gritty, fruity"
        });

        let asiago = await Cheese.create({
            title: "asiago",
            description: "smooth, mild flavor"
        });

        await hardBoard.addCheeses([parmesan, asiago]);
        await softBoard.addCheeses([parmesan, asiago]);
        await parmesan.addBoards([hardBoard, softBoard]);
        await asiago.addBoards([hardBoard, softBoard]);

        const cheesesOnHardBoard = await hardBoard.getCheeses();
        expect(cheesesOnHardBoard.length).toBe(2);
        expect(cheesesOnHardBoard[0]).toHaveProperty("title", "parmesan");

        const cheesesOnSoftBoard = await hardBoard.getCheeses();
        expect(cheesesOnSoftBoard.length).toBe(2);
        expect(cheesesOnSoftBoard[1]).toHaveProperty("title", "asiago");

        const parmesanBoards = await parmesan.getBoards();
        expect(parmesanBoards.length).toBe(2);
        expect(parmesanBoards[1] instanceof Board).toBeTruthy();

        const asiagoBoards = await parmesan.getBoards();
        expect(asiagoBoards.length).toBe(2);
        expect(parmesanBoards[1].rating).toBe(9);
    });

    
});