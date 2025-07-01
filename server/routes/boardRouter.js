const experss = require("express");
const { getAllBoards, createBoard, getBoardById, updateBoard, deleteBoard } = require("../controllers/boardController");
const router = experss.Router();



router.post('/', createBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;