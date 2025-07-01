const experss = require("express");
const { getAllBoards, createBoard, getBoardById } = require("../controllers/boardController");
const router = experss.Router();



router.post('/', createBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);

module.exports = router;