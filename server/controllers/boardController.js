const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// POST -> /boards - create a board
exports.createBoard = async (req, res)=>{
try {
    const {authorId , title, category, stickerUrl} = req.body;
    if(!title || !category) return res.status(400).json({error: 'Title and category are required'});

    const board = await prisma.board.create({
        data:{
            author: {
                connect:{
                    user_id: authorId
                }
            },
            title,
            category,
            stickerUrl
        }
    });
    res.status(201).json(board)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create board' });
    }

};

// GET -> /boards - get all boards
exports.getAllBoards = async (req, res)=>{
    try {
        const boards = await prisma.board.findMany({
            include: {author: true}
        });
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch boards' }); 
    }
    
};

// GET -> /boards/:id - get board by id 
exports.getBoardById = async (req, res)=>{
try {
    const {id} = req.params;

    const board = await prisma.board.findUnique({where: {board_id: parseInt(id)}});

} catch (error) {
    
}
};