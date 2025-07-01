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
    if(!board) return res.status(404).json({error: 'Board not found'})
    res.json(board);
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch board' });
}
};

// PUT -> /boards/:id - update board by id 
exports.updateBoard = async (req, res)=>{
    const {id} = req.params;

    const {title, category, stickerUrl} = req.body;

    try {
        const updatedBoard = await prisma.board.update({
                where:{ board_id:  parseInt(id)},
                data: {title, category, stickerUrl}
        });
        console.log(updatedBoard)
        res.status(200).json(updatedBoard);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update board' });
    }
    };

// DELETE -> /boards/:id - delete board by id 
exports.deleteBoard = async (req, res)=>{
    const {id} = req.params;
     try {
        const deletePet = await prisma.board.delete({
            where:{board_id: parseInt(id)}
        });
        res.json({
            message: 'Board successfully deleted',
            deletePet
        })
     } catch (error) {
        res.status(500).json({ error: 'Failed to delete board' });
     }
    };