import dayjs from "libs/dayjs";
import { ToolTip, ToolTipArrow, ToolTipArea } from "./types";
import { color } from "config/constants";
import { roundFormat } from "config/utils";

const { white, accent, positive, negative } = color;

// TODO: refactor code below to use more concrete type notation
export const toolTipTemplate = (data: ToolTip): string => `
  <div>    
    <span style="color: ${white}">${dayjs(data.time * 1000)
    .utc()
    .format("DD MMM YYYY HH:mm")}</span>
  </div>
  <div>    
    <span style="color: ${accent}">o</span>
    <span style="color: ${white}">: ${data.open}</span>
  </div>
  <div>
    <span style="color: ${accent}">h</span>
    <span style="color: ${white}">: ${data.high}</span>
  </div>
  <div>
    <div style="display: inline-block; min-width: 8px">
      <span style="color: ${accent}">l</span>
    </div>
    <span style="color: ${white}">: ${data.low}</span>
  </div>  
  <div>
    <div style="display: inline-block; min-width: 8px">
      <span style="color: ${accent}">c</span>
    </div>
    <span style="color: ${white}">: ${data.close}</span>
  </div>
  <div>
    <div style="display: inline-block; min-width: 8px">
      <span style="color: ${accent}">v</span>
    </div>
    <span style="color: ${white}">: ${roundFormat(data.volume)}</span>
  </div>`;

export const toolTipTemplateArea = (data: ToolTipArea): string => `
  <div>    
    <span style="color: ${white}">${dayjs(data.time * 1000)
    .utc()
    .format("DD MMM YYYY HH:mm")}</span>
  </div>
  <div>
    <span style="color: ${white}">${roundFormat(data.value)} $</span>
  </div>`;

export const toolTipArrowTemplate = (data: ToolTipArrow): string => `
  <div>    
    <span style="color: ${white}">${dayjs(data.tooltipTime * 1000)
    .utc()
    .format("DD MMM YYYY HH:mm")}</span>
  </div>
  <div>
    <span style="color: ${data.colorAction}">${data.action}</span>
    <span style="color: ${white}"> ${data.code}</span>
  </div>
  <div>
    <span style="color: ${white}">${data.price.toFixed(2)} $</span>
  </div>
  <div>
    <span style="color: ${white}">${data.volume}</span>
  </div>
  ${
      data.exit
          ? `<div>
  <span style="color: ${data.profit > 0 ? positive : negative}">${data.profit > 0 ? "+" : ""}${data.profit.toFixed(
                2
            )} $</span>
</div>`
          : ""
  }`;
