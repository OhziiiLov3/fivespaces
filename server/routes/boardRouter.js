const experss = require("express");
const { getAllBoards, createBoard, getBoardById, updateBoard, deleteBoard } = require("../controllers/boardController");
const authenticateToken = require("../middleware/authMiddleware");
const router = experss.Router();



router.post('/', authenticateToken , createBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);
router.put('/:id',authenticateToken, updateBoard);
router.delete('/:id',authenticateToken, deleteBoard);

module.exports = router;