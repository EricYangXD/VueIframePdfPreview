<template>
  <div class="con_min" id="con_min">
    <div class="con_body">
      <iframe
        title="PDF预览"
        ref="iframeRef"
        id="myframe"
        :src="url"
        style="width: 100%; height: 98%; overflow: hidden"
        allowfullscreen="true"
      ></iframe>
    </div>
  </div>
</template>
<!--
  frameborder="0"
  scrolling="no"
  hspace="0
-->
<script>
import moment from "moment";

export default {
  data() {
    return {
      tableHeight: "",
      //路径拼接（从路由获取）
      url: "https://pdfobject.com/pdf/sample-3pp.pdf"
    };
  },
  created() {
    this.ready();
  },
  methods: {
    ready() {
      // 水印
      const that = this;
      this.$nextTick(() => {
        var iframe = that.$refs.iframeRef;
        console.log(iframe);
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", function() {
            that.watermark(that.getName());
          });
        } else {
          iframe.onload = function() {
            that.watermark(that.getName());
          };
        }
      });
    },
    getName() {
      const name = "EricYangXD"; //人名
      return `${name} ${moment().format("YYYY年MM月DD日 HH时mm分ss秒")}`;
    },
    watermark(settings) {
      // 水印 默认设置
      const defaultSettings = {
        watermark_txt: settings,
        watermark_x: 20, //水印起始位置x轴坐标
        watermark_y: 20, //水印起始位置Y轴坐标
        watermark_rows: 0, //水印行数
        watermark_cols: 0, //水印列数
        watermark_x_space: 150, //水印x轴间隔
        watermark_y_space: 150, //水印y轴间隔
        watermark_color: "#a9a9a9", //水印字体颜色
        watermark_alpha: 0.1, //水印透明度
        watermark_fontsize: "14px", //水印字体大小
        watermark_font: "微软雅黑", //水印字体
        watermark_width: 166, //水印宽度
        watermark_height: 100, //水印长度
        watermark_angle: 20 //水印倾斜度数
      };
      if (arguments.length === 1 && typeof arguments[0] === "object") {
        const src = arguments[0] || {};
        for (const key in src) {
          if (
            src[key] &&
            defaultSettings[key] &&
            src[key] === defaultSettings[key]
          ) {
            continue;
          } else if (src[key]) {
            defaultSettings[key] = src[key];
          }
        }
      }
      const oTemp = document.createDocumentFragment();
      //获取页面最大宽度
      const page_width = Math.max(
        document.body.scrollWidth,
        document.body.clientWidth
      );
      //获取页面最大高度
      let page_height = Math.max(
        document.body.scrollHeight,
        document.body.clientHeight
      ); //+ 450;
      page_height = Math.max(page_height, window.innerHeight - 30);
      //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
      if (
        defaultSettings.watermark_cols == 0 ||
        parseInt(
          defaultSettings.watermark_x +
            defaultSettings.watermark_width * defaultSettings.watermark_cols +
            defaultSettings.watermark_x_space *
              (defaultSettings.watermark_cols - 1)
        ) > page_width
      ) {
        defaultSettings.watermark_cols = parseInt(
          (page_width -
            defaultSettings.watermark_x +
            defaultSettings.watermark_x_space) /
            (defaultSettings.watermark_width +
              defaultSettings.watermark_x_space)
        );
        defaultSettings.watermark_x_space = parseInt(
          (page_width -
            defaultSettings.watermark_x -
            defaultSettings.watermark_width * defaultSettings.watermark_cols) /
            (defaultSettings.watermark_cols - 1)
        );
      }
      //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
      if (
        defaultSettings.watermark_rows == 0 ||
        parseInt(
          defaultSettings.watermark_y +
            defaultSettings.watermark_height * defaultSettings.watermark_rows +
            defaultSettings.watermark_y_space *
              (defaultSettings.watermark_rows - 1)
        ) > page_height
      ) {
        defaultSettings.watermark_rows = parseInt(
          (defaultSettings.watermark_y_space +
            page_height -
            defaultSettings.watermark_y) /
            (defaultSettings.watermark_height +
              defaultSettings.watermark_y_space)
        );
        defaultSettings.watermark_y_space = parseInt(
          (page_height -
            defaultSettings.watermark_y -
            defaultSettings.watermark_height * defaultSettings.watermark_rows) /
            (defaultSettings.watermark_rows - 1)
        );
      }
      let x;
      let y;
      for (let i = 0; i < defaultSettings.watermark_rows; i++) {
        y =
          defaultSettings.watermark_y +
          (defaultSettings.watermark_y_space +
            defaultSettings.watermark_height) *
            i;
        for (let j = 0; j < defaultSettings.watermark_cols; j++) {
          x =
            defaultSettings.watermark_x +
            (defaultSettings.watermark_width +
              defaultSettings.watermark_x_space) *
              j;
          const mask_div = document.createElement("div");
          mask_div.id = "mask_div" + i + j;
          mask_div.className = "mask_div";
          mask_div.appendChild(
            document.createTextNode(defaultSettings.watermark_txt)
          );
          //设置水印div倾斜显示
          mask_div.style.webkitTransform =
            "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.MozTransform =
            "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.msTransform =
            "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.OTransform =
            "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.transform =
            "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.visibility = "";
          mask_div.style.position = "absolute";
          mask_div.style.left = x + "px";
          mask_div.style.top = y + "px";
          mask_div.style.overflow = "hidden";
          mask_div.style.zIndex = "9999";
          //让水印不遮挡页面的点击事件
          mask_div.style.pointerEvents = "none";
          mask_div.style.opacity = defaultSettings.watermark_alpha;
          mask_div.style.fontSize = defaultSettings.watermark_fontsize;
          mask_div.style.fontFamily = defaultSettings.watermark_font;
          mask_div.style.color = defaultSettings.watermark_color;
          mask_div.style.textAlign = "center";
          mask_div.style.width = defaultSettings.watermark_width + "px";
          mask_div.style.height = defaultSettings.watermark_height + "px";
          mask_div.style.display = "block";
          oTemp.appendChild(mask_div);
        }
      }
      const shuiyinbox = document.getElementById("con_min");
      shuiyinbox.appendChild(oTemp);
    }
  }
};
</script>
<style>
@media print {
  body {
    display: none;
  }
}
.con_min {
  height: 100%;
}
.con_body {
  height: 100%;
}
</style>
