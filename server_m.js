const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");//multer 모듈 //Multer는 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js 의 미들웨어 입니다. 
const upload = multer({
   storage: multer.diskStorage({//저장공간
      destination: function (req, file, cb) {//파일이 저장된 폴더
         cb(null, "uploads");
      },
      filename: function (req, file, cb) {//destination에 저장된 파일명을=>
         cb(null, file.originalname)//어려운path값을 파일이름으로 변환/사용자가 업로드한 파일명
      },
   }),
});
const port = 8080;





app.use(express.json());//json 형식의 데이터를 처리할수 있게 설정
app.use(cors());//브라우저의 cors 이슈를 막기 위해 사용하는 코드
app.use("/uploads", express.static("uploads"));

app.get('/banners',(res, req) => {
   models.Banner.findAll({
      limit:2
   }).then((result) => {
      res.send({
         banners:result
      })
   }).catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다.")
   })
})

app.get("/products", function (req, res) {
   models.Product.findAll({
    /* limit:2//갯수제한 */
      order: [["createdAt", "DESC"]],//내림차순
      attributes: ["id", "name", "price", "seller", "imageUrl", "createdAt", "soldout"],//product.js의 속성 
   })
      .then((result) => {
         res.send({
            product: result,
         });
      })
      .catch((err) => {
         console.error(err);
         res.status(400).send("에러발생");
      });
});

app.get("/products/:id", function (req, res) {
   const params = req.params;
   const { id } = params;
   /* res.send(`id는  ${id} 입니다.`) //products/2424 = id = 2424 / products/2424/event/500 */
   models.Product.findOne({//-----------1개만 가져와라
      where: {
         id,
      },
   })
      .then((result) => {
         res.send({ product: result });
      })
      .catch((err) => {
         console.error(err);
         res.status(400).send("상품조회시 에러가 발생했습니다.");
      });
});

app.post("/products", function (req, res) {
    /* res.send('상품을 등록하였습니다.') */
   const body = req.body;
   const { name, description, price, seller,imageUrl } = body; //밑에 아이템 다 들어가있는지 확인 필수
   if (!name || !description || !price || !seller) {
      res.send("모든 필드를 입력해주세요");
   }
   models.Product.create({
      name,
      description,
      price,
      seller,
      imageUrl
   })
      .then((result) => {
         res.send({
            product:result
         })
      })
      .catch((err) => {
         console.error(err);
         res.status(400).send("상품업로드에 문제가 발생했습니다");
      });
});

app.post("/purchase/:id", (req, res) => {
   const {id} = req.params;
   models.Product.update(
      {
         soldout:1,
      },
      {
         where:{
            id,
         }
      }
   )
   .then(() => {
      res.send({
         result:true,
      })
   })
   .catch((err) => {
      console.error(err);
      res.status(400).send("에러발생");
   });
})

//multer 사용
app.post("/image", upload.single("image"), (req, res) => {
   const file = req.file;
   console.log(file);
   res.send({
      imageUrl: file.path,//업로드된파일의전체경로 
   });
});

app.listen(port, () => {
   console.log("망고샵 서버 실행중");
   models.sequelize
      .sync()
      .then(() => {
         console.log("DB 연결 성공");
      })
      .catch((err) => {
         console.log("DB 연결 실패");
         console.error(err);
         process.exit();
      });
});