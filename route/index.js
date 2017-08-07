const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const publicPath = path.join(__dirname, '../public');
const router = express.Router();

// 文件解析与保存
const fileParse = (req, res, form) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({ code: 1, err });
    }
    const keys = Object.keys(files);
    keys.forEach((key) => {
      const filePath = files[key].path;
      const fileName = files[key].name;
      const targetFile = path.join(publicPath, fileName);
      // 移动文件
      fs.renameSync(filePath, targetFile);
    });
    // 返回上传信息
    res.json({ code: 0, success: 1 });
  });
};

router.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.maxFieldsSize = (5 * 1024) * 1024 * 1024;
  form.uploadDir = '/tmp';
  form.keepExtensions = true;
  // 检查目标目录，不存在则创建
  fs.access(publicPath, (err) => {
    if (err) {
      fs.mkdirSync(publicPath);
    }
    fileParse(req, res, form);
  });
});

router.get('/', (req, res) => {
  fs.readdir(publicPath, (err, files) => {
    if (err) res.json({ code: 0, data: err });
    const data = files.map((item) => {
      return `${item}`;
    });
    res.json({ code: 1, data });
  });
});

module.exports = router;
