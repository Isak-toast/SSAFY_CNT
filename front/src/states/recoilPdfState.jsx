import { atom } from "recoil";

const data1ImgAtom = atom({
  key: "data1ImgAtom",
  default: "",
});

const data2ImgAtom = atom({
  key: "data2ImgAtom",
  default: "",
});

const data3ImgAtom = atom({
  key: "data3ImgAtom",
  default: "",
});

const textMiningImgAtom = atom({
  key: "textMiningImgAtom",
  default: "",
});

const pdfStateAtom = atom({
  key: "pdfStateAtom",
  default: false,
});

const data1StateAtom = atom({
  key: "data1StateAtom",
  default: false,
});

const data2StateAtom = atom({
  key: "data2StateAtom",
  default: false,
});

const data3StateAtom = atom({
  key: "data3StateAtom",
  default: false,
});

const textMiningStateAtom = atom({
  key: "textMiningStateAtom",
  default: false,
});

const preventClickAtom = atom({
  key: "preventClickAtom",
  default: false,
});

const pdfData1CommentAtom = atom({
  key: "pdfData1CommentAtom",
  default: [],
});

export {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
  pdfStateAtom,
  data1StateAtom,
  data2StateAtom,
  data3StateAtom,
  textMiningStateAtom,
  preventClickAtom,
  pdfData1CommentAtom,
};
