// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class DiceBase {
    svg;
    SIDE_LENGTH;
    INNER_LINE_STYLE;
    OUTER_LINE_STYLE;
    viewBox;
    OPTIONS;
    mmToPxScale;
    infos;
    CONTENTS;
    PASTE_WIDTH;
    TEXT_STYLE;
    constructor(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH = 0, TEXT_STYLE = ''){
        if (OUTER_LINE_STYLE.length === 0) OUTER_LINE_STYLE = 'stroke:#555;stroke-width:0.2mm;';
        if (INNER_LINE_STYLE.length === 0) {
            INNER_LINE_STYLE = 'stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;';
        }
        this.svg = svg;
        this.SIDE_LENGTH = SIDE_LENGTH;
        this.INNER_LINE_STYLE = INNER_LINE_STYLE;
        this.OUTER_LINE_STYLE = OUTER_LINE_STYLE;
        this.viewBox = viewBox;
        this.OPTIONS = OPTIONS;
        this.mmToPxScale = mmToPxScale;
        this.infos = infos;
        this.CONTENTS = CONTENTS;
        this.PASTE_WIDTH = PASTE_WIDTH;
        this.TEXT_STYLE = TEXT_STYLE;
    }
    fixTextStyle(scale) {
        if (this.TEXT_STYLE.length === 0) {
            const { FONT_SIZE } = this.OPTIONS;
            if (FONT_SIZE.length) {
                this.TEXT_STYLE = `font-family:"Times New Roman", "Kaiti";font-size:${/^[0-9\.]+$/.test(FONT_SIZE) ? FONT_SIZE.concat('mm') : FONT_SIZE};`;
            } else {
                this.TEXT_STYLE = `font-family:"Times New Roman", "Kaiti";font-size:${this.SIDE_LENGTH * scale}mm;`;
            }
        }
    }
    draw() {
        this.drawGraphs();
        this.setTextsInfo();
        this.infos.forEach(({ content, x, y, rotate })=>{
            SvgHelper.appendText(this.svg, this.TEXT_STYLE, content, x, y, rotate, '', null, true);
        });
    }
    setSvgTextInfo = SvgHelper.setSvgTextInfo;
    appendLine = SvgHelper.appendLine;
    appendCircle = SvgHelper.appendCircle;
    getSinByAngle(angle) {
        return Math.sin(angle * Math.PI / 180);
    }
    getCosByAngle(angle) {
        return Math.cos(angle * Math.PI / 180);
    }
}
class DiceFace4 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.25);
        const HEIGHT_OF_ONE = this.SIDE_LENGTH * 1.732 * 0.5;
        const HEIGHT_OF_TWO = HEIGHT_OF_ONE * 2;
        let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        x1 = this.SIDE_LENGTH * 0.5, x2 = x1 + this.SIDE_LENGTH, y1 = HEIGHT_OF_ONE, y2 = y1;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = 0, x2 = x1 + this.SIDE_LENGTH, y1 += HEIGHT_OF_ONE, y2 = y1;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = this.SIDE_LENGTH, x2 = this.SIDE_LENGTH * 0.5, y1 = 0, y2 = HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 += this.SIDE_LENGTH * 0.5, x2 += this.SIDE_LENGTH * 0.5, y1 += HEIGHT_OF_ONE, y2 += HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = this.SIDE_LENGTH * 0.5, x2 = this.SIDE_LENGTH, y1 = HEIGHT_OF_ONE, y2 = HEIGHT_OF_TWO;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 += this.SIDE_LENGTH, x2 += this.SIDE_LENGTH;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        const { SIDE_LENGTH } = this;
        const EXTNED_SCALE = SIDE_LENGTH < 3 ? 1 : SIDE_LENGTH <= 10 ? 0.5 : 0.15;
        const EXTNED_LENGTH = EXTNED_SCALE * this.SIDE_LENGTH;
        const OFFSET_X = EXTNED_LENGTH * 0.5;
        const OFFSET_Y = EXTNED_LENGTH * Math.cos(30 / 180 * Math.PI);
        x1 = 0, x2 = this.SIDE_LENGTH * 0.5, y1 = HEIGHT_OF_TWO, y2 = HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 -= OFFSET_X, y1 = y2, y2 -= OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 = this.SIDE_LENGTH * 1 - EXTNED_LENGTH, y1 = y2, y2 = 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 += EXTNED_LENGTH, y1 = y2, y2 += 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 += this.SIDE_LENGTH * 0.5, y1 = y2, y2 += HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 += EXTNED_LENGTH, y1 = y2, y2 += 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 = this.SIDE_LENGTH * 2 + OFFSET_X, y1 = y2, y2 = HEIGHT_OF_TWO - OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 -= OFFSET_X, y1 = y2, y2 += OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 -= this.SIDE_LENGTH, y1 = y2, y2 -= 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 -= OFFSET_X, y1 = y2, y2 += OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 = OFFSET_X, y1 = y2, y2 -= 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x2, x2 = 0, y1 = y2, y2 = HEIGHT_OF_TWO;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
    }
    setTextsInfo() {
        const SIN60 = Math.sin(Math.PI * 60 / 180);
        const COS60 = Math.cos(Math.PI * 60 / 180);
        const HALF_COS60_AND_OFFSET = COS60 * 0.75;
        const MINI_OFFSET_SCALE_OF_Y = COS60 * 0.075;
        const { infos, SIDE_LENGTH, setSvgTextInfo } = this;
        const X1 = SIDE_LENGTH * HALF_COS60_AND_OFFSET;
        const X2 = SIDE_LENGTH * 0.5;
        const X3 = SIDE_LENGTH * (1 - HALF_COS60_AND_OFFSET);
        const X4 = SIDE_LENGTH * (0.5 + HALF_COS60_AND_OFFSET);
        const X5 = SIDE_LENGTH * 1;
        const X6 = SIDE_LENGTH * (1.5 - HALF_COS60_AND_OFFSET);
        const X7 = SIDE_LENGTH * (1 + HALF_COS60_AND_OFFSET);
        const X8 = SIDE_LENGTH * 1.5;
        const X9 = SIDE_LENGTH * (2 - HALF_COS60_AND_OFFSET);
        const Y1 = SIDE_LENGTH * (SIN60 * 0.5 + MINI_OFFSET_SCALE_OF_Y);
        const Y2 = SIDE_LENGTH * SIN60 * 0.85;
        const Y3 = SIDE_LENGTH * SIN60 * 1.15;
        const Y4 = SIDE_LENGTH * (SIN60 * 1.5 - MINI_OFFSET_SCALE_OF_Y);
        const Y5 = SIDE_LENGTH * (SIN60 * 1.5 + MINI_OFFSET_SCALE_OF_Y);
        const Y6 = SIDE_LENGTH * SIN60 * 1.85;
        [
            {
                x: X5,
                y: Y2,
                rotate: 0
            },
            {
                x: X3,
                y: Y5,
                rotate: -120
            },
            {
                x: X7,
                y: Y5,
                rotate: 120
            },
            {
                x: X4,
                y: Y1,
                rotate: 120
            },
            {
                x: X4,
                y: Y4,
                rotate: 60
            },
            {
                x: X8,
                y: Y6,
                rotate: 0
            },
            {
                x: X6,
                y: Y1,
                rotate: -120
            },
            {
                x: X6,
                y: Y4,
                rotate: -60
            },
            {
                x: X2,
                y: Y6,
                rotate: 0
            },
            {
                x: X5,
                y: Y3,
                rotate: -180
            },
            {
                x: X1,
                y: Y5,
                rotate: 120
            },
            {
                x: X9,
                y: Y5,
                rotate: -120
            }
        ].map(({ x, y, rotate }, n)=>{
            setSvgTextInfo(infos[n], x, y, rotate);
        });
    }
}
class DiceFace6 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.45);
        const SIDE_LENGTH_PX = this.SIDE_LENGTH * this.mmToPxScale;
        const duckTongueScale = 0.5;
        const duckTongueHeightPx = SIDE_LENGTH_PX * 0.5;
        const duckTongueHeight = this.SIDE_LENGTH * 0.5;
        this.duckTongueScale = duckTongueScale;
        const { SIDE_LENGTH } = this;
        const pasteRegionScale = SIDE_LENGTH < 3 ? 1 : SIDE_LENGTH <= 10 ? 0.9 : 0.75;
        const pasteRegionHeightPx = SIDE_LENGTH_PX * pasteRegionScale;
        this.SIDE_LENGTH * pasteRegionScale;
        const offsetX = SIDE_LENGTH_PX * 0.1;
        const pasteRegionWidth = SIDE_LENGTH_PX - offsetX * 2;
        console.log(this.SIDE_LENGTH, this.mmToPxScale, SIDE_LENGTH_PX);
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#000000');
        path.setAttribute('d', `M 0, ${duckTongueHeightPx + SIDE_LENGTH_PX} `.concat(`h ${SIDE_LENGTH_PX * 2} `, `l ${offsetX}, -${pasteRegionHeightPx} `, `h ${pasteRegionWidth} `, `l ${offsetX}, ${pasteRegionHeightPx} `, `v -${SIDE_LENGTH_PX} `, `l ${offsetX}, -${duckTongueHeightPx} `, `h ${pasteRegionWidth} `, `l ${offsetX}, ${duckTongueHeightPx} `, `v ${SIDE_LENGTH_PX} `, `l ${offsetX}, -${pasteRegionHeightPx} `, `h ${pasteRegionWidth} `, `l ${offsetX}, ${pasteRegionHeightPx} `, `v ${SIDE_LENGTH_PX} `, `h -${SIDE_LENGTH_PX * 2} `, `l -${offsetX}, ${pasteRegionHeightPx} `, `h -${pasteRegionWidth} `, `l -${offsetX}, -${pasteRegionHeightPx} `, `v ${SIDE_LENGTH_PX} `, `l -${offsetX}, ${duckTongueHeightPx} `, `h -${pasteRegionWidth} `, `l -${offsetX}, -${duckTongueHeightPx} `, `v -${SIDE_LENGTH_PX} `, `l -${offsetX}, ${pasteRegionHeightPx} `, `h -${pasteRegionWidth} `, `l -${offsetX}, -${pasteRegionHeightPx} `, ' z'));
        this.svg.appendChild(path);
        const X2 = this.SIDE_LENGTH * 1, X3 = this.SIDE_LENGTH * 2, X4 = this.SIDE_LENGTH * 3, X5 = this.SIDE_LENGTH * 4, X6 = this.SIDE_LENGTH * 5;
        const Y2 = duckTongueHeight, Y4 = Y2 + this.SIDE_LENGTH, Y5 = Y4 + this.SIDE_LENGTH, Y7 = Y5 + this.SIDE_LENGTH;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X4, X5, Y2, Y2, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X3, X6, Y4, Y4, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, 0, X4, Y5, Y5, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X2, X3, Y7, Y7, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X2, X2, Y4, Y5, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X3, X3, Y4, Y5, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X4, X4, Y4, Y5, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, X5, X5, Y4, Y5, null);
        this.viewBox.left = 0;
        this.viewBox.top = 0;
        this.viewBox.right = this.SIDE_LENGTH * 5;
        this.viewBox.bottom = this.SIDE_LENGTH * 3 + this.SIDE_LENGTH * duckTongueScale * 2;
    }
    setTextsInfo() {
        const { infos, SIDE_LENGTH, setSvgTextInfo } = this;
        const { duckTongueScale } = this;
        const X1 = SIDE_LENGTH * 0.5;
        const X2 = X1 + SIDE_LENGTH;
        const X3 = X2 + SIDE_LENGTH;
        const X4 = X3 + SIDE_LENGTH;
        const Y1 = SIDE_LENGTH * (duckTongueScale + 0.5);
        const Y2 = Y1 + SIDE_LENGTH;
        const Y3 = Y2 + SIDE_LENGTH;
        [
            {
                x: X4,
                y: Y1,
                rotate: 180
            },
            {
                x: X1,
                y: Y2,
                rotate: 90
            },
            {
                x: X2,
                y: Y2,
                rotate: 0
            },
            {
                x: X4,
                y: Y2,
                rotate: 180
            },
            {
                x: X3,
                y: Y2,
                rotate: -90
            },
            {
                x: X2,
                y: Y3,
                rotate: 0
            }
        ].map(({ x, y, rotate }, n)=>{
            setSvgTextInfo(infos[n], x, y, rotate);
        });
    }
}
class DiceFace8 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.45);
        const HEIGHT_OF_ONE = this.SIDE_LENGTH * 1.732 * 0.5;
        const HEIGHT_OF_TWO = HEIGHT_OF_ONE * 2;
        const BOTTOM = HEIGHT_OF_ONE * 3;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, 0, this.SIDE_LENGTH * 2, HEIGHT_OF_ONE, HEIGHT_OF_ONE, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 0.5, this.SIDE_LENGTH * 2.5, HEIGHT_OF_TWO, HEIGHT_OF_TWO, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 1, this.SIDE_LENGTH * 0.5, HEIGHT_OF_ONE, HEIGHT_OF_TWO, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 2, this.SIDE_LENGTH * 1.5, HEIGHT_OF_ONE, HEIGHT_OF_TWO, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 3, this.SIDE_LENGTH * 2, HEIGHT_OF_ONE, BOTTOM, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 1, this.SIDE_LENGTH * 1.5, HEIGHT_OF_ONE, HEIGHT_OF_TWO, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 1.5, this.SIDE_LENGTH * 2.5, 0, HEIGHT_OF_TWO, null);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, this.SIDE_LENGTH * 3, this.SIDE_LENGTH * 3.5, HEIGHT_OF_ONE, HEIGHT_OF_TWO, null);
        const { SIDE_LENGTH } = this;
        const EXTNED_SCALE = SIDE_LENGTH < 3 ? 1 : SIDE_LENGTH <= 10 ? 0.5 : 0.15;
        const EXTNED_LENGTH = EXTNED_SCALE * this.SIDE_LENGTH;
        const OFFSET_X = EXTNED_LENGTH * 0.5;
        const OFFSET_Y = EXTNED_LENGTH * Math.cos(30 / 180 * Math.PI);
        let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        x1 = 0, x2 = OFFSET_X, y1 = HEIGHT_OF_ONE, y2 = HEIGHT_OF_ONE - OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 = this.SIDE_LENGTH - OFFSET_X, y1 = y2;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 = this.SIDE_LENGTH, y1 = y2, y2 = HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += this.SIDE_LENGTH * 0.5, y1 = y2, y2 = 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += EXTNED_LENGTH, y1 = y2, y2 = 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += this.SIDE_LENGTH * 0.5 - OFFSET_X, y1 = y2, y2 = HEIGHT_OF_ONE - OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= OFFSET_X, y1 = y2, y2 += OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += this.SIDE_LENGTH + EXTNED_LENGTH, y1 = y2, y2 += 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += this.SIDE_LENGTH * 0.5 - EXTNED_LENGTH + OFFSET_X, y1 = y2, y2 += HEIGHT_OF_ONE - OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= OFFSET_X, y1 = y2, y2 += OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= this.SIDE_LENGTH, y1 = y2, y2 += 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += OFFSET_X, y1 = y2, y2 += OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 += EXTNED_LENGTH - this.SIDE_LENGTH * 0.5 - OFFSET_X, y1 = y2, y2 += HEIGHT_OF_ONE - OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= EXTNED_LENGTH, y1 = y2, y2 += 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= this.SIDE_LENGTH * 0.5, y1 = y2, y2 -= HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= OFFSET_X, y1 = y2, y2 += OFFSET_Y;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= this.SIDE_LENGTH - OFFSET_X * 2, y1 = y2, y2 += 0;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        x1 = x2, x2 -= OFFSET_X + this.SIDE_LENGTH * 0.5, y1 = y2, y2 -= OFFSET_Y + HEIGHT_OF_ONE;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, x1, x2, y1, y2, null);
        this.viewBox.right = this.SIDE_LENGTH * 3.5 + EXTNED_LENGTH * Math.sin(45 / 180 * Math.PI);
        this.viewBox.bottom = BOTTOM;
    }
    setTextsInfo() {
        const { infos, SIDE_LENGTH, setSvgTextInfo } = this;
        const HALF_SIDE_LENGTH = SIDE_LENGTH * 0.5;
        const X1 = HALF_SIDE_LENGTH;
        const X2 = X1 + HALF_SIDE_LENGTH;
        const X3 = X2 + HALF_SIDE_LENGTH;
        const X4 = X3 + HALF_SIDE_LENGTH;
        const X5 = X4 + HALF_SIDE_LENGTH;
        const X6 = X5 + HALF_SIDE_LENGTH;
        const SIN60 = Math.sin(Math.PI * 60 / 180);
        const Y1 = SIDE_LENGTH * SIN60 * 0.70;
        const Y2 = SIDE_LENGTH * SIN60 * 1.30;
        const Y3 = SIDE_LENGTH * SIN60 * 1.70;
        const Y4 = SIDE_LENGTH * SIN60 * 2.30;
        [
            {
                x: X3,
                y: Y1,
                rotate: 0
            },
            {
                x: X6,
                y: Y3,
                rotate: 0
            },
            {
                x: X4,
                y: Y3,
                rotate: 0
            },
            {
                x: X2,
                y: Y3,
                rotate: 0
            },
            {
                x: X5,
                y: Y2,
                rotate: 180
            },
            {
                x: X1,
                y: Y2,
                rotate: 180
            },
            {
                x: X3,
                y: Y2,
                rotate: 180
            },
            {
                x: X4,
                y: Y4,
                rotate: 180
            }
        ].map(({ x, y, rotate }, n)=>{
            setSvgTextInfo(infos[n], x, y, rotate);
        });
    }
}
class DiceFace12 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.45);
        const { SIDE_LENGTH } = this;
        const PASTE_SCALE = SIDE_LENGTH < 3 ? 1 : SIDE_LENGTH <= 10 ? 0.5 : 0.25;
        const PASTE_LENGTH = this.SIDE_LENGTH * PASTE_SCALE;
        const RADIUS = this.SIDE_LENGTH * 0.2;
        const ANGLE18 = Math.PI * 18 / 180;
        const ANGLE36 = Math.PI * 36 / 180;
        const ANGLE54 = Math.PI * 54 / 180;
        const ANGLE72 = Math.PI * 72 / 180;
        const SIN18 = Math.sin(ANGLE18);
        const SIN36 = Math.sin(ANGLE36);
        const SIN54 = Math.sin(ANGLE54);
        const SIN72 = Math.sin(ANGLE72);
        const HALF_SIDE_LENGTH = this.SIDE_LENGTH * 0.5;
        const LONG_SIDE_LENGTH = this.SIDE_LENGTH * 0.5 / SIN18;
        const HALF_LONG_SIDE_LENGTH = LONG_SIDE_LENGTH * 0.5;
        const SIN18_MULTIPLY_SIDE_LENGTH = this.SIDE_LENGTH * SIN18;
        const SIN36_MULTIPLY_SIDE_LENGTH = this.SIDE_LENGTH * SIN36;
        const SIN54_MULTIPLY_SIDE_LENGTH = this.SIDE_LENGTH * SIN54;
        const SIN72_MULTIPLY_SIDE_LENGTH = this.SIDE_LENGTH * SIN72;
        const SIN18_MULTIPLY_QUARTER_SIDE_LENGTH = PASTE_LENGTH * SIN18;
        const SIN36_MULTIPLY_QUARTER_SIDE_LENGTH = PASTE_LENGTH * SIN36;
        const SIN54_MULTIPLY_QUARTER_SIDE_LENGTH = PASTE_LENGTH * SIN54;
        const SIN72_MULTIPLY_QUARTER_SIDE_LENGTH = PASTE_LENGTH * SIN72;
        const SIN72_MULTIPLY_LONG_SIDE_LENGTH = LONG_SIDE_LENGTH * SIN72;
        const SECOND_GROUP_OFFSET = this.SIDE_LENGTH * 2 + LONG_SIDE_LENGTH + SIN18_MULTIPLY_SIDE_LENGTH;
        const TOP = SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
        this.data = {
            HALF_SIDE_LENGTH,
            LONG_SIDE_LENGTH,
            HALF_LONG_SIDE_LENGTH,
            SIN18_MULTIPLY_SIDE_LENGTH,
            SIN72_MULTIPLY_SIDE_LENGTH,
            SIN54_MULTIPLY_QUARTER_SIDE_LENGTH,
            SECOND_GROUP_OFFSET,
            TOP
        };
        for(let groupIndex = 0; groupIndex < 2; ++groupIndex){
            const LEFT = (groupIndex === 0 ? 0 : SECOND_GROUP_OFFSET) + SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
            let A1x = 0, A1y = 0;
            let A2x = 0, A2y = 0;
            let A3x = 0, A3y = 0;
            let A4x = 0, A4y = 0;
            let A5x = 0, A5y = 0;
            let B1x = 0, B1y = 0;
            let B2x = 0, B2y = 0;
            let B5x = 0, B5y = 0;
            let C1x = 0, C1y = 0;
            let C2x = 0, C2y = 0;
            let C5x = 0, C5y = 0;
            let D1x = 0, D1y = 0;
            let D2x = 0, D2y = 0;
            let D5x = 0, D5y = 0;
            let E1x = 0, E1y = 0;
            let E2x = 0, E2y = 0;
            let E5x = 0, E5y = 0;
            let F1x = 0, F1y = 0;
            let F2x = 0, F2y = 0;
            let F5x = 0, F5y = 0;
            if (groupIndex === 0) {
                A1x = LEFT + SIN18 * (this.SIDE_LENGTH + SIN18_MULTIPLY_SIDE_LENGTH * 2) + LONG_SIDE_LENGTH;
                A2x = A1x + SIN54_MULTIPLY_SIDE_LENGTH;
                A5x = A1x - SIN54_MULTIPLY_SIDE_LENGTH;
                A3x = A2x - SIN18_MULTIPLY_SIDE_LENGTH;
                A4x = A5x + SIN18_MULTIPLY_SIDE_LENGTH;
                B1x = A5x - HALF_SIDE_LENGTH;
                B2x = A5x + HALF_SIDE_LENGTH;
                B5x = A1x - LONG_SIDE_LENGTH;
                C1x = A2x + HALF_SIDE_LENGTH;
                C5x = A2x - HALF_SIDE_LENGTH;
                C2x = A1x + LONG_SIDE_LENGTH;
                D1x = A3x + LONG_SIDE_LENGTH;
                D2x = A3x + HALF_LONG_SIDE_LENGTH;
                D5x = A2x + this.SIDE_LENGTH;
                E1x = A4x + HALF_SIDE_LENGTH;
                E2x = A4x - SIN18_MULTIPLY_SIDE_LENGTH;
                E5x = A3x + SIN18_MULTIPLY_SIDE_LENGTH;
                F1x = A4x - LONG_SIDE_LENGTH;
                F5x = A4x - HALF_LONG_SIDE_LENGTH;
                F2x = A5x - this.SIDE_LENGTH;
                A1y = TOP + SIN72_MULTIPLY_SIDE_LENGTH;
                A2y = A1y + SIN36_MULTIPLY_SIDE_LENGTH;
                A5y = A2y;
                A3y = A2y + SIN72_MULTIPLY_SIDE_LENGTH;
                A4y = A3y;
                B1y = TOP;
                B2y = B1y;
                B5y = A1y;
                C1y = B1y;
                C5y = B1y;
                C2y = B5y;
                D1y = A3y;
                D2y = A3y + SIN36_MULTIPLY_SIDE_LENGTH;
                D5y = A2y;
                E2y = A4y + SIN72_MULTIPLY_SIDE_LENGTH;
                E5y = E2y;
                E1y = E2y + SIN36_MULTIPLY_SIDE_LENGTH;
                F1y = A4y;
                F2y = A2y;
                F5y = D2y;
            } else {
                A1x = LEFT + LONG_SIDE_LENGTH + this.SIDE_LENGTH;
                A2x = A1x + SIN18_MULTIPLY_SIDE_LENGTH;
                A3x = A1x - HALF_SIDE_LENGTH;
                A5x = A1x - this.SIDE_LENGTH;
                A4x = A5x - SIN18_MULTIPLY_SIDE_LENGTH;
                B1x = A5x + HALF_SIDE_LENGTH;
                B2x = A1x + SIN18_MULTIPLY_SIDE_LENGTH;
                B5x = A5x - SIN18_MULTIPLY_SIDE_LENGTH;
                C2x = A2x + this.SIDE_LENGTH;
                C1x = A1x + LONG_SIDE_LENGTH;
                C5x = A1x + HALF_LONG_SIDE_LENGTH;
                D2x = A3x + SIN18_MULTIPLY_SIDE_LENGTH;
                D1x = D2x + this.SIDE_LENGTH;
                D5x = D1x + SIN18_MULTIPLY_SIDE_LENGTH;
                E2x = A3x - LONG_SIDE_LENGTH;
                E1x = E2x + SIN18_MULTIPLY_SIDE_LENGTH;
                E5x = E1x + this.SIDE_LENGTH;
                F1x = A5x - LONG_SIDE_LENGTH;
                F2x = A5x - HALF_LONG_SIDE_LENGTH;
                F5x = A4x - this.SIDE_LENGTH;
                A1y = TOP + SIN72_MULTIPLY_LONG_SIDE_LENGTH;
                A2y = A1y + SIN72_MULTIPLY_SIDE_LENGTH;
                A3y = A1y + SIN72_MULTIPLY_LONG_SIDE_LENGTH;
                A4y = A2y;
                A5y = A1y;
                B1y = TOP;
                B2y = A5y - SIN72_MULTIPLY_SIDE_LENGTH;
                B5y = B2y;
                C1y = A1y;
                C2y = A2y;
                C5y = A1y - SIN36_MULTIPLY_SIDE_LENGTH;
                D5y = A3y;
                D1y = D5y + SIN72_MULTIPLY_SIDE_LENGTH;
                D2y = D1y;
                E1y = D1y;
                E2y = D5y;
                E5y = D1y;
                F1y = C1y;
                F2y = C5y;
                F5y = A4y;
            }
            const { svg, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, appendLine } = this;
            const LINE_STYLE = groupIndex === 0 ? INNER_LINE_STYLE : OUTER_LINE_STYLE;
            appendLine(svg, INNER_LINE_STYLE, A1x, A2x, A1y, A2y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A2x, A3x, A2y, A3y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A3x, A4x, A3y, A4y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A4x, A5x, A4y, A5y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A5x, A1x, A5y, A1y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A1x, B2x, A1y, B2y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, A1x, C5x, A1y, C5y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A2x, C2x, A2y, C2y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, A2x, D5x, A2y, D5y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A3x, D2x, A3y, D2y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, A3x, E5x, A3y, E5y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A4x, E2x, A4y, E2y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, A4x, F5x, A4y, F5y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, A5x, F2x, A5y, F2y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, A5x, B5x, A5y, B5y, viewBox);
            appendLine(svg, LINE_STYLE, B1x, B2x, B1y, B2y, viewBox);
            appendLine(svg, LINE_STYLE, B1x, B5x, B1y, B5y, viewBox);
            appendLine(svg, LINE_STYLE, C1x, C2x, C1y, C2y, viewBox);
            appendLine(svg, LINE_STYLE, C1x, C5x, C1y, C5y, viewBox);
            appendLine(svg, LINE_STYLE, D1x, D2x, D1y, D2y, viewBox);
            appendLine(svg, LINE_STYLE, D1x, D5x, D1y, D5y, viewBox);
            appendLine(svg, LINE_STYLE, E1x, E2x, E1y, E2y, viewBox);
            appendLine(svg, LINE_STYLE, E1x, E5x, E1y, E5y, viewBox);
            appendLine(svg, LINE_STYLE, F1x, F2x, F1y, F2y, viewBox);
            appendLine(svg, INNER_LINE_STYLE, F1x, F5x, F1y, F5y, viewBox);
            let B6x = 0, B6y = 0;
            let B7x = 0, B7y = 0;
            let B8x = 0, B8y = 0;
            let B9x = 0, B9y = 0;
            let C6x = 0, C6y = 0;
            let C7x = 0, C7y = 0;
            let C8x = 0, C8y = 0;
            let C9x = 0, C9y = 0;
            let D8x = 0, D8y = 0;
            let D9x = 0, D9y = 0;
            let E6x = 0, E6y = 0;
            let E7x = 0, E7y = 0;
            let E8x = 0, E8y = 0;
            let E9x = 0, E9y = 0;
            let F6x = 0, F6y = 0;
            let F7x = 0, F7y = 0;
            let F8x = 0, F8y = 0;
            let F9x = 0, F9y = 0;
            if (groupIndex === 0) {
                B6x = B5x - SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                B6y = B5y - SIN36_MULTIPLY_QUARTER_SIDE_LENGTH;
                B7x = B1x - PASTE_LENGTH;
                C8x = C1x + PASTE_LENGTH;
                B7y = B1y;
                C8y = B1y;
                B8x = B1x + SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                B9x = B2x - SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                C6x = C5x + SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                C7x = C1x - SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                B8y = B1y - SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
                B9y = B8y;
                C6y = B8y;
                C7y = B8y;
                C9x = C2x + SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                C9y = C2y - SIN36_MULTIPLY_QUARTER_SIDE_LENGTH;
                D8x = D1x + SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                D8y = D1y + SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
                D9x = D2x + SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                D9y = D2y + SIN36_MULTIPLY_QUARTER_SIDE_LENGTH;
                E6x = E5x + SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                E6y = E5y + SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
                E7x = E1x + SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                E8x = E1x - SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                E7y = E1y + SIN36_MULTIPLY_QUARTER_SIDE_LENGTH;
                E8y = E7y;
                E9x = E2x - SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                E9y = E2y + SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
                F6x = F5x - SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                F6y = F5y + SIN36_MULTIPLY_QUARTER_SIDE_LENGTH;
                F7x = F1x - SIN18_MULTIPLY_QUARTER_SIDE_LENGTH;
                F7y = F1y + SIN72_MULTIPLY_QUARTER_SIDE_LENGTH;
                F8x = F1x - SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
                F8y = F1y - SIN36_MULTIPLY_QUARTER_SIDE_LENGTH;
                F9x = F2x - PASTE_LENGTH;
                F9y = F2y;
            }
            appendLine(svg, OUTER_LINE_STYLE, B2x, C5x, B2y, C5y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, C2x, D5x, C2y, D5y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, D2x, E5x, D2y, E5y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, E2x, F5x, E2y, F5y, viewBox);
            appendLine(svg, OUTER_LINE_STYLE, F2x, B5x, F2y, B5y, viewBox);
            if (groupIndex === 0) {
                appendLine(svg, OUTER_LINE_STYLE, B5x, B6x, B5y, B6y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, B1x, B7x, B1y, B7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, B1x, B8x, B1y, B8y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, B2x, B9x, B2y, B9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, C5x, C6x, C5y, C6y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, C1x, C7x, C1y, C7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, C1x, C8x, C1y, C8y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, C2x, C9x, C2y, C9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, D1x, D8x, D1y, D8y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, D2x, D9x, D2y, D9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, E5x, E6x, E5y, E6y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, E1x, E7x, E1y, E7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, E1x, E8x, E1y, E8y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, E2x, E9x, E2y, E9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, F5x, F6x, F5y, F6y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, F1x, F7x, F1y, F7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, F1x, F8x, F1y, F8y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, F2x, F9x, F2y, F9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, B6x, B7x, B6y, B7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, B8x, B9x, B8y, B9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, C6x, C7x, C6y, C7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, C8x, C9x, C8y, C9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, 0, 0, 0, 0, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, D8x, D9x, D8y, D9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, E6x, E7x, E6y, E7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, E8x, E9x, E8y, E9y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, F6x, F7x, F6y, F7y, viewBox);
                appendLine(svg, OUTER_LINE_STYLE, F8x, F9x, F8y, F9y, viewBox);
            }
            if (this.OPTIONS.withHole) {
                const CC1x = (A1x + A2x + A3x + A4x + A5x) * 0.2, CC1y = (A1y + A2y + A3y + A4y + A5y) * 0.2;
                const CC2x = (A1x + A5x + B1x + B2x + B5x) * 0.2, CC2y = (A1y + A5y + B1y + B2y + B5y) * 0.2;
                const CC3x = (A1x + A2x + C1x + C2x + C5x) * 0.2, CC3y = (A1y + A2y + C1y + C2y + C5y) * 0.2;
                const CC4x = (A2x + A3x + D1x + D2x + D5x) * 0.2, CC4y = (A2y + A3y + D1y + D2y + D5y) * 0.2;
                const CC5x = (A3x + A4x + E1x + E2x + E5x) * 0.2, CC5y = (A3y + A4y + E1y + E2y + E5y) * 0.2;
                const CC6x = (A4x + A5x + F1x + F2x + F5x) * 0.2, CC6y = (A4y + A5y + F1y + F2y + F5y) * 0.2;
                this.appendCircle(this.svg, this.INNER_LINE_STYLE, CC1x, CC1y, RADIUS, null);
                this.appendCircle(this.svg, this.INNER_LINE_STYLE, CC2x, CC2y, RADIUS, null);
                this.appendCircle(this.svg, this.INNER_LINE_STYLE, CC3x, CC3y, RADIUS, null);
                this.appendCircle(this.svg, this.INNER_LINE_STYLE, CC4x, CC4y, RADIUS, null);
                this.appendCircle(this.svg, this.INNER_LINE_STYLE, CC5x, CC5y, RADIUS, null);
                this.appendCircle(this.svg, this.INNER_LINE_STYLE, CC6x, CC6y, RADIUS, null);
            }
        }
    }
    setTextsInfo() {
        const { infos, SIDE_LENGTH, setSvgTextInfo } = this;
        const { HALF_SIDE_LENGTH, LONG_SIDE_LENGTH, HALF_LONG_SIDE_LENGTH, SIN18_MULTIPLY_SIDE_LENGTH, SIN72_MULTIPLY_SIDE_LENGTH, SIN54_MULTIPLY_QUARTER_SIDE_LENGTH, SECOND_GROUP_OFFSET, TOP } = this.data;
        const X1 = SIN54_MULTIPLY_QUARTER_SIDE_LENGTH + HALF_LONG_SIDE_LENGTH;
        const X2 = SIN54_MULTIPLY_QUARTER_SIDE_LENGTH + SIN18_MULTIPLY_SIDE_LENGTH + SIDE_LENGTH;
        const X3 = SIN54_MULTIPLY_QUARTER_SIDE_LENGTH + LONG_SIDE_LENGTH + HALF_SIDE_LENGTH;
        const X4 = X3 + HALF_SIDE_LENGTH + SIN18_MULTIPLY_SIDE_LENGTH;
        const X5 = X3 + HALF_SIDE_LENGTH + HALF_LONG_SIDE_LENGTH;
        const X6_TO_X10_OFFSET = SECOND_GROUP_OFFSET + SIN54_MULTIPLY_QUARTER_SIDE_LENGTH;
        const X6 = X6_TO_X10_OFFSET + HALF_LONG_SIDE_LENGTH;
        const X7 = X6_TO_X10_OFFSET + SIN18_MULTIPLY_SIDE_LENGTH + SIDE_LENGTH;
        const X8 = X6_TO_X10_OFFSET + LONG_SIDE_LENGTH + HALF_SIDE_LENGTH;
        const X9 = X6_TO_X10_OFFSET + LONG_SIDE_LENGTH + SIDE_LENGTH + SIN18_MULTIPLY_SIDE_LENGTH;
        const X10 = X6_TO_X10_OFFSET + LONG_SIDE_LENGTH + SIDE_LENGTH + HALF_LONG_SIDE_LENGTH;
        const Y1 = TOP + HALF_LONG_SIDE_LENGTH * 0.8;
        const Y2 = TOP + HALF_LONG_SIDE_LENGTH * 1.2;
        const Y3 = TOP + HALF_LONG_SIDE_LENGTH + SIN72_MULTIPLY_SIDE_LENGTH;
        const Y4 = TOP + HALF_LONG_SIDE_LENGTH * 0.75 + LONG_SIDE_LENGTH;
        const Y5 = TOP + HALF_LONG_SIDE_LENGTH * 0.8 + SIN72_MULTIPLY_SIDE_LENGTH + LONG_SIDE_LENGTH;
        const Y6 = Y3 + LONG_SIDE_LENGTH;
        [
            {
                x: X3,
                y: Y3,
                rotate: 0
            },
            {
                x: X4,
                y: Y1,
                rotate: 180
            },
            {
                x: X2,
                y: Y1,
                rotate: 180
            },
            {
                x: X5,
                y: Y4,
                rotate: 180
            },
            {
                x: X1,
                y: Y4,
                rotate: 180
            },
            {
                x: X3,
                y: Y5,
                rotate: 180
            },
            {
                x: X8,
                y: Y2,
                rotate: 0
            },
            {
                x: X6,
                y: Y3,
                rotate: 0
            },
            {
                x: X10,
                y: Y3,
                rotate: 0
            },
            {
                x: X7,
                y: Y6,
                rotate: 0
            },
            {
                x: X9,
                y: Y6,
                rotate: 0
            },
            {
                x: X8,
                y: Y4,
                rotate: 180
            }
        ].map(({ x, y, rotate }, n)=>{
            setSvgTextInfo(infos[n], x, y, rotate);
        });
    }
}
class DiceFace20 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.45);
        const { SIDE_LENGTH } = this;
        const pasteRegionScale = SIDE_LENGTH < 3 ? 1 : SIDE_LENGTH <= 10 ? 0.5 : 0.25;
        const pasteRegion = this.SIDE_LENGTH * pasteRegionScale;
        const pasteRegionPx = pasteRegion * this.mmToPxScale;
        const ANGLE60 = Math.PI * 60 / 180;
        const SIN60 = Math.sin(ANGLE60);
        const COS60 = Math.cos(ANGLE60);
        const OneX = this.SIDE_LENGTH * COS60;
        const OneY = this.SIDE_LENGTH * SIN60;
        const pasteRegionShortBiasX = pasteRegion * COS60;
        const pasteRegionShortBiasY = pasteRegion * SIN60;
        const pasteRegionLongBias = this.SIDE_LENGTH * (1 - pasteRegionScale);
        const pasteRegionLongBiasX = pasteRegionLongBias * COS60;
        const pasteRegionLongBiasY = pasteRegionLongBias * SIN60;
        const TwoY = OneY * 2;
        const ThreeY = OneY * 3;
        this.pasteRegionShortBiasX = pasteRegionShortBiasX;
        let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        const FIVE_SIDE = this.SIDE_LENGTH * 5;
        x1 = pasteRegionLongBiasX + pasteRegion, x2 = x1 + FIVE_SIDE;
        y1 = OneY, y2 = y1;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 = x1 - OneX, x2 = x1 + FIVE_SIDE;
        y1 += OneY, y2 = y1;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 -= OneX, x2 = x1 - OneX;
        y1 = OneY, y2 = TwoY;
        for(let i = 0; i < 5; ++i){
            x1 += this.SIDE_LENGTH, x2 += this.SIDE_LENGTH;
            this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        }
        x1 = pasteRegionShortBiasX, x2 = x1 + OneX;
        y1 = TwoY, y2 = ThreeY;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 += OneX, x2 += OneX * 2;
        y1 = OneY, y2 = y1 + TwoY;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 -= OneX;
        y1 = 0;
        for(let i = 0; i < 3; ++i){
            x1 += this.SIDE_LENGTH, x2 += this.SIDE_LENGTH;
            this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        }
        x1 += this.SIDE_LENGTH, x2 += OneX;
        y2 = TwoY;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        x1 += this.SIDE_LENGTH, x2 += OneX;
        y2 = OneY;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, x1, x2, y1, y2, this.viewBox);
        const OneXPx = OneX * this.mmToPxScale;
        const OneYPx = OneY * this.mmToPxScale;
        const pasteRegionShortBiasXPx = pasteRegionShortBiasX * this.mmToPxScale;
        const pasteRegionShortBiasYPx = pasteRegionShortBiasY * this.mmToPxScale;
        const pasteRegionLongBiasXPx = pasteRegionLongBiasX * this.mmToPxScale;
        const pasteRegionLongBiasYPx = pasteRegionLongBiasY * this.mmToPxScale;
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#000000');
        path.setAttribute('d', `M 0, ${OneYPx + pasteRegionLongBiasYPx} `.concat(` l ${pasteRegionLongBiasXPx}, -${pasteRegionLongBiasYPx}`, ` h ${pasteRegionPx}`, ` l ${OneXPx}, -${OneYPx}`, ` h ${pasteRegionPx}`, ` l ${pasteRegionLongBiasXPx}, ${pasteRegionLongBiasYPx}`, ` l -${pasteRegionShortBiasXPx}, ${pasteRegionShortBiasYPx}`, ` l ${OneXPx}, -${OneYPx}`, ` h ${pasteRegionPx}`, ` l ${pasteRegionLongBiasXPx}, ${pasteRegionLongBiasYPx}`, ` l -${pasteRegionShortBiasXPx}, ${pasteRegionShortBiasYPx}`, ` l ${OneXPx}, -${OneYPx}`, ` h ${pasteRegionPx}`, ` l ${pasteRegionLongBiasXPx}, ${pasteRegionLongBiasYPx}`, ` l -${pasteRegionShortBiasXPx}, ${pasteRegionShortBiasYPx}`, ` l ${OneXPx}, -${OneYPx}`, ` h ${pasteRegionPx}`, ` l ${pasteRegionLongBiasXPx}, ${pasteRegionLongBiasYPx}`, ` l -${pasteRegionShortBiasXPx}, ${pasteRegionShortBiasYPx}`, ` l ${OneXPx}, -${OneYPx}`, ` h ${pasteRegionPx}`, ` l ${pasteRegionLongBiasXPx}, ${pasteRegionLongBiasYPx}`, ` l -${pasteRegionShortBiasXPx + OneXPx * 2}, ${pasteRegionShortBiasYPx + OneYPx * 2}`, ` h -${pasteRegionPx}`, ` l -${pasteRegionLongBiasXPx}, -${pasteRegionLongBiasYPx}`, ` l ${pasteRegionShortBiasXPx}, -${pasteRegionShortBiasYPx}`, ` l -${OneXPx}, ${OneYPx}`, ` h -${pasteRegionPx}`, ` l -${pasteRegionLongBiasXPx}, -${pasteRegionLongBiasYPx}`, ` l ${pasteRegionShortBiasXPx}, -${pasteRegionShortBiasYPx}`, ` l -${OneXPx}, ${OneYPx}`, ` h -${pasteRegionPx}`, ` l -${pasteRegionLongBiasXPx}, -${pasteRegionLongBiasYPx}`, ` l ${pasteRegionShortBiasXPx}, -${pasteRegionShortBiasYPx}`, ` l -${OneXPx}, ${OneYPx}`, ` h -${pasteRegionPx}`, ` l -${pasteRegionLongBiasXPx}, -${pasteRegionLongBiasYPx}`, ` l ${pasteRegionShortBiasXPx}, -${pasteRegionShortBiasYPx}`, ` l -${OneXPx}, ${OneYPx}`, ` h -${pasteRegionPx}`, ` l -${pasteRegionLongBiasXPx}, -${pasteRegionLongBiasYPx}`, ` l ${pasteRegionShortBiasXPx}, -${pasteRegionShortBiasYPx}`, ' z'));
        this.svg.appendChild(path);
        this.viewBox.right = this.SIDE_LENGTH * 5 + OneX + pasteRegion;
        this.viewBox.bottom = OneY * 3;
    }
    setTextsInfo() {
        const { infos, SIDE_LENGTH, setSvgTextInfo } = this;
        const pasteRegionShortBiasX = this.pasteRegionShortBiasX;
        const HALF_SIDE_LENGTH = SIDE_LENGTH * 0.5;
        const X1 = pasteRegionShortBiasX + HALF_SIDE_LENGTH;
        const X2 = X1 + HALF_SIDE_LENGTH;
        const X3 = X2 + HALF_SIDE_LENGTH;
        const X4 = X3 + HALF_SIDE_LENGTH;
        const X5 = X4 + HALF_SIDE_LENGTH;
        const X6 = X5 + HALF_SIDE_LENGTH;
        const X7 = X6 + HALF_SIDE_LENGTH;
        const X8 = X7 + HALF_SIDE_LENGTH;
        const X9 = X8 + HALF_SIDE_LENGTH;
        const X10 = X9 + HALF_SIDE_LENGTH;
        const SIN60 = Math.sin(Math.PI * 60 / 180);
        const Y1 = SIDE_LENGTH * SIN60 * 0.70;
        const Y2 = SIDE_LENGTH * SIN60 * 1.30;
        const Y3 = SIDE_LENGTH * SIN60 * 1.70;
        const Y4 = SIDE_LENGTH * SIN60 * 2.30;
        [
            {
                x: X2,
                y: Y1,
                rotate: 0
            },
            {
                x: X10,
                y: Y2,
                rotate: 180
            },
            {
                x: X6,
                y: Y2,
                rotate: 180
            },
            {
                x: X5,
                y: Y4,
                rotate: 180
            },
            {
                x: X4,
                y: Y1,
                rotate: 0
            },
            {
                x: X8,
                y: Y2,
                rotate: 180
            },
            {
                x: X4,
                y: Y2,
                rotate: 180
            },
            {
                x: X3,
                y: Y4,
                rotate: 180
            },
            {
                x: X6,
                y: Y1,
                rotate: 0
            },
            {
                x: X2,
                y: Y2,
                rotate: 180
            },
            {
                x: X7,
                y: Y3,
                rotate: 0
            },
            {
                x: X1,
                y: Y4,
                rotate: 180
            },
            {
                x: X8,
                y: Y1,
                rotate: 0
            },
            {
                x: X9,
                y: Y3,
                rotate: 0
            },
            {
                x: X3,
                y: Y3,
                rotate: 0
            },
            {
                x: X9,
                y: Y4,
                rotate: 180
            },
            {
                x: X10,
                y: Y1,
                rotate: 0
            },
            {
                x: X1,
                y: Y3,
                rotate: 0
            },
            {
                x: X5,
                y: Y3,
                rotate: 0
            },
            {
                x: X7,
                y: Y4,
                rotate: 180
            }
        ].map(({ x, y, rotate }, n)=>{
            setSvgTextInfo(infos[n], x, y, rotate);
        });
    }
}
class DiceFace24 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.8);
        const { SIDE_LENGTH } = this;
        const { getSinByAngle, getCosByAngle } = this;
        const SIDE_SCALE = SIDE_LENGTH / 25;
        const BIGER_ANGLE = 180 - 48.275 * 2;
        const SMALL_ANGLE_COS = Math.cos(48.275 * Math.PI / 180);
        const HALF_LONG_SIDE_LENGTH = SIDE_LENGTH;
        const SHORT_SIDE_LENGTH = HALF_LONG_SIDE_LENGTH / SMALL_ANGLE_COS;
        let ax = 0, ay = 0, bx = 0, by = 0, cx = 0, cy = 0, dx = 0, dy = 0, ex = 0, ey = 0, fx = 0, fy = 0;
        let aax = 0, aay = 0, bbx = 0, bby = 0, ddx = 0, ddy = 0, eex = 0, eey = 0, ffx = 0, ffy = 0, fffx = 0, fffy = 0;
        let content_offset_top = -3, content_offset_left = -2;
        content_offset_top *= 1.5, content_offset_left *= 1.5;
        const OFFSET_X = -23.0805019730301175 * SIDE_SCALE;
        const X_VALUE = SIDE_LENGTH * 6;
        const ax1 = X_VALUE + OFFSET_X, ay1 = 0;
        const bx1 = ax1 + SIDE_LENGTH * 2, by1 = 0;
        const cx1 = ax1 + HALF_LONG_SIDE_LENGTH, cy1 = SHORT_SIDE_LENGTH * getSinByAngle(48.275);
        const angle_cd1 = BIGER_ANGLE - 48.275;
        const dx1 = cx1 - SHORT_SIDE_LENGTH * getCosByAngle(angle_cd1), dy1 = cy1 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cd1);
        const angle_ce1 = 180 - BIGER_ANGLE - angle_cd1;
        const ex1 = cx1 + SHORT_SIDE_LENGTH * getCosByAngle(angle_ce1), ey1 = cy1 + SHORT_SIDE_LENGTH * getSinByAngle(angle_ce1);
        const angle_cf1 = BIGER_ANGLE - angle_ce1;
        const fx1 = cx1 + SHORT_SIDE_LENGTH * getCosByAngle(angle_cf1), fy1 = cy1 - SHORT_SIDE_LENGTH * getSinByAngle(angle_cf1);
        const c_mirror_ad_x1 = ax1 + dx1 - cx1;
        const c_mirror_ad_y1 = 0 + dy1 - cy1;
        const aax1 = ax1 + (c_mirror_ad_x1 - ax1) * 0.3, aay1 = 0 + (c_mirror_ad_y1 - 0) * 0.3;
        const bbx1 = 0, bby1 = 0;
        const ddx1 = dx1 + (c_mirror_ad_x1 - dx1) * 0.3, ddy1 = dy1 + (c_mirror_ad_y1 - dy1) * 0.3;
        const ffx1 = bx1 + (cx1 - bx1) * 0.3, ffy1 = 0 + (cy1 - 0) * 0.3;
        const c_mirror_ef_x1 = ex1 + fx1 - cx1;
        const c_mirror_ef_y1 = ey1 + fy1 - cy1;
        const eex1 = ex1 + (c_mirror_ef_x1 - ex1) * 0.3, eey1 = ey1 + (c_mirror_ef_y1 - ey1) * 0.3;
        const fffx1 = fx1 + (c_mirror_ef_x1 - fx1) * 0.3, fffy1 = fy1 + (c_mirror_ef_y1 - fy1) * 0.3;
        ax = ax1, ay = ay1, bx = bx1, by = by1, cx = cx1, cy = cy1, dx = dx1, dy = dy1, ex = ex1, ey = ey1, fx = fx1, fy = fy1;
        aax = aax1, aay = aay1, bbx = bbx1, bby = bby1, ddx = ddx1, ddy = ddy1, eex = eex1, eey = eey1, ffx = ffx1, ffy = ffy1, fffx = fffx1, fffy = fffy1;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, bx, ay, by, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, dx, ay, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, cx, ay, cy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, cx, by, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, dx, cy, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, ex, cy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, fx, cy, fy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, dx, ex, dy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ex, fx, ey, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, ffx, fy, ffy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, aax, ay, aay, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, dx, ddx, dy, ddy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, aax, ddx, aay, ddy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, eex, fffx, eey, fffy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ex, eex, ey, eey, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, fffx, fy, fffy, this.viewBox);
        const cx4 = dx1 + ex1 - cx1, cy4 = dy1 + ey1 - cy1;
        const ax4 = ex1, ay4 = ey1;
        const dx4 = dx1, dy4 = dy1;
        const angle_cd4 = Math.atan((cy4 - dy4) / (cx4 - dx4)) * 180 / Math.PI;
        const angle_ce4 = BIGER_ANGLE - angle_cd4;
        const angle_cf4 = BIGER_ANGLE - (90 - angle_ce4);
        const angle_ca4 = BIGER_ANGLE - (90 - angle_cd4);
        const angle_cb4 = BIGER_ANGLE - (90 - angle_ca4);
        const ex4 = cx4 - SHORT_SIDE_LENGTH * getCosByAngle(angle_ce4);
        const ey4 = cy4 + SHORT_SIDE_LENGTH * getSinByAngle(angle_ce4);
        const fx4 = cx4 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cf4);
        const fy4 = cy4 + SHORT_SIDE_LENGTH * getCosByAngle(angle_cf4);
        const bx4 = cx4 + SHORT_SIDE_LENGTH * getCosByAngle(angle_cb4);
        const by4 = cy4 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cb4);
        const ffx4 = bx4 + (cx4 - bx4) * 0.3, ffy4 = by4 + (cy4 - by4) * 0.3;
        ax = ax4, ay = ay4, bx = bx4, by = by4, cx = cx4, cy = cy4, dx = dx4, dy = dy4, ex = ex4, ey = ey4, fx = fx4, fy = fy4;
        ffx = ffx4, ffy = ffy4;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, bx, ay, by, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, cx, ay, cy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, cx, by, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, dx, cy, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, ex, cy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, fx, cy, fy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, dx, ex, dy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ex, fx, ey, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, ffx, fy, ffy, this.viewBox);
        const cx5 = ax4 + bx4 - cx4, cy5 = ay4 + by4 - cy4;
        const dx5 = ax4, dy5 = ay4;
        const ex5 = bx4, ey5 = by4;
        const angle_cd5 = Math.atan((cy5 - dy5) / (cx5 - dx5)) * 180 / Math.PI;
        const angle_ce5 = BIGER_ANGLE - angle_cd5;
        const angle_cf5 = BIGER_ANGLE - (90 - angle_ce5);
        const angle_ca5 = BIGER_ANGLE - (90 - angle_cd5);
        const angle_cb5 = BIGER_ANGLE - (90 - angle_ca5);
        const ax5 = cx5 + SHORT_SIDE_LENGTH * getSinByAngle(angle_ca5);
        const ay5 = cy5 - SHORT_SIDE_LENGTH * getCosByAngle(angle_ca5);
        const bx5 = cx5 + SHORT_SIDE_LENGTH * getCosByAngle(angle_cb5);
        const by5 = cy5 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cb5);
        const fx5 = cx5 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cf5);
        const fy5 = cy5 + SHORT_SIDE_LENGTH * getCosByAngle(angle_cf5);
        const ffx5 = bx5 + (cx5 - bx5) * 0.3, ffy5 = by5 + (cy5 - by5) * 0.3;
        const c_mirror_ab_x5 = ax5 + bx5 - cx5, c_mirror_ab_y5 = ay5 + by5 - cy5;
        const aax5 = ax5 + (c_mirror_ab_x5 - ax5) * 0.3, aay5 = ay5 + (c_mirror_ab_y5 - ay5) * 0.3;
        const bbx5 = bx5 + (c_mirror_ab_x5 - bx5) * 0.3, bby5 = by5 + (c_mirror_ab_y5 - by5) * 0.3;
        ax = ax5, ay = ay5, bx = bx5, by = by5, cx = cx5, cy = cy5, dx = dx5, dy = dy5, ex = ex5, ey = ey5, fx = fx5, fy = fy5;
        aax = aax5, aay = aay5, bbx = bbx5, bby = bby5, ffx = ffx5, ffy = ffy5;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, bx, ay, by, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, cx, ay, cy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, dx, ay, dy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, cx, by, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, dx, cy, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, ex, cy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, fx, cy, fy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, dx, ex, dy, ey, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ex, fx, ey, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, ffx, fy, ffy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, aax, ay, aay, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, bbx, by, bby, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, aax, bbx, aay, bby, this.viewBox);
        const cx6 = ex4 + fx4 - cx4, cy6 = ey4 + fy4 - cy4;
        const dx6 = fx4, dy6 = fy4;
        const ex6 = ex4, ey6 = ey4;
        const angle_cd6 = Math.atan((cy6 - dy6) / (dx6 - cx6)) * 180 / Math.PI;
        const angle_ce6 = Math.atan((cy6 - ey6) / (cx6 - ex6)) * 180 / Math.PI;
        const angle_ca6 = BIGER_ANGLE - angle_cd6;
        const angle_cf6 = BIGER_ANGLE - angle_ce6;
        const angle_cb6 = BIGER_ANGLE - (90 - angle_ca6);
        const ax6 = cx6 + SHORT_SIDE_LENGTH * getCosByAngle(angle_ca6);
        const ay6 = cy6 + SHORT_SIDE_LENGTH * getSinByAngle(angle_ca6);
        const bx6 = cx6 - SHORT_SIDE_LENGTH * getSinByAngle(angle_cb6);
        const by6 = cy6 + SHORT_SIDE_LENGTH * getCosByAngle(angle_cb6);
        const fx6 = cx6 - SHORT_SIDE_LENGTH * getCosByAngle(angle_cf6);
        const fy6 = cy6 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cf6);
        const ffx6 = bx6 + (cx6 - bx6) * 0.3, ffy6 = by6 + (cy6 - by6) * 0.3;
        const c_mirror_ad_x6 = ax6 + dx6 - cx6, c_mirror_ad_y6 = ay6 + dy6 - cy6;
        const aax6 = ax6 + (c_mirror_ad_x6 - ax6) * 0.3, aay6 = ay6 + (c_mirror_ad_y6 - ay6) * 0.3;
        const ddx6 = dx6 + (c_mirror_ad_x6 - dx6) * 0.3, ddy6 = dy6 + (c_mirror_ad_y6 - dy6) * 0.3;
        const c_mirror_ef_x6 = ex6 + fx6 - cx6, c_mirror_ef_y6 = ey6 + fy6 - cy6;
        const eex6 = ex6 + (c_mirror_ef_x6 - ex6) * 0.3, eey6 = ey6 + (c_mirror_ef_y6 - ey6) * 0.3;
        const fffx6 = fx6 + (c_mirror_ef_x6 - fx6) * 0.3, fffy6 = fy6 + (c_mirror_ef_y6 - fy6) * 0.3;
        ax = ax6, ay = ay6, bx = bx6, by = by6, cx = cx6, cy = cy6, dx = dx6, dy = dy6, ex = ex6, ey = ey6, fx = fx6, fy = fy6;
        aax = aax6, aay = aay6, ddx = ddx6, ddy = ddy6, eex = eex6, eey = eey6, ffx = ffx6, ffy = ffy6, fffx = fffx6, fffy = fffy6;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, bx, ay, by, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, cx, ay, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, dx, ay, dy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, cx, by, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, dx, cy, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, ex, cy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, fx, cy, fy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ex, fx, ey, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, ffx, fy, ffy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, aax, ay, aay, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, dx, ddx, dy, ddy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, aax, ddx, aay, ddy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, eex, fffx, eey, fffy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ex, eex, ey, eey, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, fffx, fy, fffy, this.viewBox);
        const cx3 = dx4 + ex4 - cx4, cy3 = dy4 + ey4 - cy4;
        const fx3 = dx4, fy3 = dy4;
        const ex3 = ex4, ey3 = ey4;
        const angle_cf3 = Math.atan((cy3 - fy3) / (fx3 - cx3)) * 180 / Math.PI;
        const angle_ce3 = BIGER_ANGLE - angle_cf3;
        const angle_cd3 = 180 - BIGER_ANGLE - angle_ce3;
        const angle_ca3 = BIGER_ANGLE - angle_cd3;
        const angle_cb3 = BIGER_ANGLE - (90 - angle_ca3);
        const ax3 = cx3 - SHORT_SIDE_LENGTH * getCosByAngle(angle_ca3);
        const ay3 = cy3 - SHORT_SIDE_LENGTH * getSinByAngle(angle_ca3);
        const bx3 = cx3 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cb3);
        const by3 = cy3 - SHORT_SIDE_LENGTH * getCosByAngle(angle_cb3);
        const dx3 = cx3 - SHORT_SIDE_LENGTH * getCosByAngle(angle_cd3);
        const dy3 = cy3 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cd3);
        const ffx3 = bx3 + (cx3 - bx3) * 0.3, ffy3 = by3 + (cy3 - by3) * 0.3;
        ax = ax3, ay = ay3, bx = bx3, by = by3, cx = cx3, cy = cy3, dx = dx3, dy = dy3, ex = ex3, ey = ey3, fx = fx3, fy = fy3;
        ffx = ffx3, ffy = ffy3;
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, bx, ay, by, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, dx, ay, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, cx, ay, cy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, cx, by, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, dx, cy, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, ex, cy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, fx, cy, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, dx, ex, dy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ex, fx, ey, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, ffx, fy, ffy, this.viewBox);
        const cx2 = ax3 + dx3 - cx3, cy2 = ay3 + dy3 - cy3;
        const fx2 = ax3, fy2 = ay3;
        const ex2 = dx3, ey2 = dy3;
        const angle_cf2 = Math.atan((cy2 - fy2) / (fx2 - cx2)) * 180 / Math.PI;
        const angle_ce2 = BIGER_ANGLE - angle_cf2;
        const angle_cd2 = 180 - BIGER_ANGLE - angle_ce2;
        const angle_ca2 = BIGER_ANGLE - angle_cd2;
        const angle_cb2 = BIGER_ANGLE - (90 - angle_ca2);
        const ax2 = cx2 - SHORT_SIDE_LENGTH * getCosByAngle(angle_ca2);
        const ay2 = cy2 - SHORT_SIDE_LENGTH * getSinByAngle(angle_ca2);
        const bx2 = cx2 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cb2);
        const by2 = cy2 - SHORT_SIDE_LENGTH * getCosByAngle(angle_cb2);
        const dx2 = cx2 - SHORT_SIDE_LENGTH * getCosByAngle(angle_cd2);
        const dy2 = cy2 + SHORT_SIDE_LENGTH * getSinByAngle(angle_cd2);
        const ffx2 = bx2 + (cx2 - bx2) * 0.3, ffy2 = by2 + (cy2 - by2) * 0.3;
        const c_mirror_ab_x2 = ax2 + bx2 - cx2, c_mirror_ab_y2 = ay2 + by2 - cy2;
        const aax2 = ax2 + (c_mirror_ab_x2 - ax2) * 0.3, aay2 = ay2 + (c_mirror_ab_y2 - ay2) * 0.3;
        const bbx2 = bx2 + (c_mirror_ab_x2 - bx2) * 0.3, bby2 = by2 + (c_mirror_ab_y2 - by2) * 0.3;
        const c_mirror_de_x2 = dx2 + ex2 - cx2, c_mirror_de_y2 = dy2 + ey2 - cy2;
        const ddx2 = dx2 + (c_mirror_de_x2 - dx2) * 0.3, ddy2 = dy2 + (c_mirror_de_y2 - dy2) * 0.3;
        const eex2 = ex2 + (c_mirror_de_x2 - ex2) * 0.3, eey2 = ey2 + (c_mirror_de_y2 - ey2) * 0.3;
        ax = ax2, ay = ay2, bx = bx2, by = by2, cx = cx2, cy = cy2, dx = dx2, dy = dy2, ex = ex2, ey = ey2, fx = fx2, fy = fy2;
        aax = aax2, aay = aay2, bbx = bbx2, bby = bby2, ddx = ddx2, ddy = ddy2, eex = eex2, eey = eey2, ffx = ffx2, ffy = ffy2;
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, bx, ay, by, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, dx, ay, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ax, cx, ay, cy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, cx, by, cy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, dx, cy, dy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, ex, cy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, cx, fx, cy, fy, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, dx, ex, dy, ey, this.viewBox);
        this.appendLine(this.svg, this.INNER_LINE_STYLE, ex, fx, ey, fy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, fx, ffx, fy, ffy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ax, aax, ay, aay, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, bx, bbx, by, bby, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, aax, bbx, aay, bby, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, dx, ddx, dy, ddy, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ex, eex, ey, eey, this.viewBox);
        this.appendLine(this.svg, this.OUTER_LINE_STYLE, ddx, eex, ddy, eey, this.viewBox);
    }
    setTextsInfo() {
        const { infos, SIDE_LENGTH, setSvgTextInfo } = this;
        const SIZE_SCALE = SIDE_LENGTH / 25;
        [
            {
                x: 195,
                y: 70.0,
                angle: 180
            },
            {
                x: 85,
                y: 44,
                angle: 180
            },
            {
                x: 132.0,
                y: 138.0,
                angle: -70.35
            },
            {
                x: 171.0,
                y: 36.0,
                angle: -70.35
            },
            {
                x: 158.0,
                y: 84.0,
                angle: -83.45
            },
            {
                x: 12,
                y: 61.0,
                angle: 83.45
            },
            {
                x: 26.0,
                y: 38,
                angle: 166.9
            },
            {
                x: 143.0,
                y: 63.0,
                angle: 193.1
            },
            {
                x: 148.0,
                y: 45.0,
                angle: 13.1
            },
            {
                x: 125.0,
                y: 115.0,
                angle: 206.2
            },
            {
                x: 105.0,
                y: 70.0,
                angle: -70.35
            },
            {
                x: 175.0,
                y: 85.0,
                angle: 96.55
            },
            {
                x: 66.0,
                y: 63.0,
                angle: 96.55
            },
            {
                x: 215.5,
                y: 88.0,
                angle: 263.45
            },
            {
                x: 153.0,
                y: 7.5,
                angle: 180
            },
            {
                x: 108,
                y: 152,
                angle: 13.1
            },
            {
                x: 30.0,
                y: 78.0,
                angle: 0
            },
            {
                x: 130.0,
                y: 100.0,
                angle: 26.2
            },
            {
                x: 122.0,
                y: 75.0,
                angle: 109.65
            },
            {
                x: 52.0,
                y: 59.0,
                angle: -83.45
            },
            {
                x: 97.5,
                y: 121.0,
                angle: 122.75
            },
            {
                x: 131.0,
                y: 28.0,
                angle: 96.55
            },
            {
                x: 191.0,
                y: 110.0,
                angle: 13.1
            },
            {
                x: 81.5,
                y: 83.5,
                angle: 13.1
            }
        ].forEach(({ x, y, angle }, n)=>{
            setSvgTextInfo(infos[n], SIZE_SCALE * x, SIZE_SCALE * y, angle);
        });
    }
}
class DiceFace10 extends DiceBase {
    drawGraphs() {
        this.fixTextStyle(0.45);
        const { max, min, sin, cos, tan, atan, PI, abs } = Math;
        const { SIDE_LENGTH, svg, viewBox, appendLine, OUTER_LINE_STYLE, INNER_LINE_STYLE } = this;
        const PASTE_SCALE = SIDE_LENGTH < 3 ? 1 : SIDE_LENGTH <= 10 ? 0.5 : 0.25;
        const PASTE_WIDTH = SIDE_LENGTH * PASTE_SCALE;
        const X_O1 = SIDE_LENGTH * 2.55;
        const Y_O1 = SIDE_LENGTH * 2.55;
        const ANGLE_SMALL_DEGREE = 50.22;
        const ANGLE_SMALL = 50.22 * PI / 180;
        const HALF_ANGLE_SMALL = ANGLE_SMALL * 0.5;
        const ANGLE_MIDDLE = 94.7 * PI / 180;
        const ANGLE_BIG = (PI - HALF_ANGLE_SMALL - ANGLE_MIDDLE) * 2;
        const ANGLE_90 = PI * 0.5;
        const ANGLE_EXTEND = 45 * PI / 180;
        const ANGLE_B1 = ANGLE_90 - HALF_ANGLE_SMALL;
        const ANGLE_B2 = ANGLE_MIDDLE - ANGLE_B1;
        const SIDE_V1 = SIDE_LENGTH * sin(ANGLE_B2);
        const SIDE_H1 = SIDE_LENGTH * cos(ANGLE_B2);
        const SIDE_LONG = SIDE_H1 / sin(HALF_ANGLE_SMALL);
        const SIDE_V2 = SIDE_LONG * sin(ANGLE_B1);
        const SIZE_LONG_MIDLINE = SIDE_V1 + SIDE_V2;
        const ANGLE_A1 = HALF_ANGLE_SMALL;
        const X_B1 = X_O1, Y_B1 = Y_O1 + SIZE_LONG_MIDLINE;
        const X_A1_DELTA = SIDE_LONG * sin(ANGLE_A1);
        const Y_A1_DELTA = SIDE_LONG * cos(ANGLE_A1);
        const X_A1 = X_O1 - X_A1_DELTA, X_C1 = X_O1 + X_A1_DELTA;
        const Y_A1 = Y_O1 + Y_A1_DELTA, Y_C1 = Y_O1 + Y_A1_DELTA;
        const ANGLE_D1 = ANGLE_SMALL;
        const X_D1 = X_O1 + SIZE_LONG_MIDLINE * sin(ANGLE_D1);
        const Y_D1 = Y_O1 + SIZE_LONG_MIDLINE * cos(ANGLE_D1);
        const ANGLE_E1 = ANGLE_SMALL * 1.5;
        const X_E1 = X_O1 + SIDE_LONG * sin(ANGLE_E1);
        const Y_E1 = Y_O1 + SIDE_LONG * cos(ANGLE_E1);
        const ANGLE_F1 = ANGLE_SMALL * 2 - ANGLE_90;
        const X_F1 = X_O1 + SIZE_LONG_MIDLINE * cos(ANGLE_F1);
        const Y_F1 = Y_O1 - SIZE_LONG_MIDLINE * sin(ANGLE_F1);
        const ANGLE_G1 = ANGLE_SMALL * 2.5 - ANGLE_90;
        const X_G1 = X_O1 + SIDE_LONG * cos(ANGLE_G1);
        const Y_G1 = Y_O1 - SIDE_LONG * sin(ANGLE_G1);
        const ANGLE_H1 = ANGLE_SMALL * 3 - ANGLE_90;
        const X_H1 = X_O1 + SIZE_LONG_MIDLINE * cos(ANGLE_H1);
        const Y_H1 = Y_O1 - SIZE_LONG_MIDLINE * sin(ANGLE_H1);
        const ANGLE_I1 = PI - ANGLE_SMALL * 3.5;
        const X_I1 = X_O1 + SIDE_LONG * sin(ANGLE_I1);
        const Y_I1 = Y_O1 - SIDE_LONG * cos(ANGLE_I1);
        const ANGLE_J1 = ANGLE_SMALL * 4 - PI;
        const X_J1 = X_O1 - SIZE_LONG_MIDLINE * sin(ANGLE_J1);
        const Y_J1 = Y_O1 - SIZE_LONG_MIDLINE * cos(ANGLE_J1);
        const ANGLE_K1 = ANGLE_SMALL * 4.5 - PI;
        const X_K1 = X_O1 - SIDE_LONG * sin(ANGLE_K1);
        const Y_K1 = Y_O1 - SIDE_LONG * cos(ANGLE_K1);
        const X_O2 = X_A1 + X_B1 - X_O1;
        const Y_O2 = Y_A1 + Y_B1 - Y_O1;
        const X_B2 = X_A1, Y_B2 = Y_A1;
        const X_C2 = X_B1, Y_C2 = Y_B1;
        const X_A2 = X_O2 * 2 - X_C2, Y_A2 = Y_C2;
        const ANGLE_D2 = ANGLE_SMALL;
        const X_D2 = X_O2 + SIZE_LONG_MIDLINE * sin(ANGLE_D2);
        const Y_D2 = Y_O2 - SIZE_LONG_MIDLINE * cos(ANGLE_D2);
        const ANGLE_E2 = ANGLE_SMALL * 1.5;
        const X_E2 = X_O2 + SIDE_LONG * sin(ANGLE_E2);
        const Y_E2 = Y_O2 - SIDE_LONG * cos(ANGLE_E2);
        const ANGLE_F2 = ANGLE_SMALL * 2 - ANGLE_90;
        const X_F2 = X_O2 + SIZE_LONG_MIDLINE * cos(ANGLE_F2);
        const Y_F2 = Y_O2 + SIZE_LONG_MIDLINE * sin(ANGLE_F2);
        const ANGLE_G2 = ANGLE_SMALL * 2.5 - ANGLE_90;
        const X_G2 = X_O2 + SIDE_LONG * cos(ANGLE_G2);
        const Y_G2 = Y_O2 + SIDE_LONG * sin(ANGLE_G2);
        const ANGLE_H2 = ANGLE_SMALL * 3 - ANGLE_90;
        const X_H2 = X_O2 + SIZE_LONG_MIDLINE * cos(ANGLE_H2);
        const Y_H2 = Y_O2 + SIZE_LONG_MIDLINE * sin(ANGLE_H2);
        const ANGLE_I2 = PI - ANGLE_SMALL * 3.5;
        const X_I2 = X_O2 + SIDE_LONG * sin(ANGLE_I2);
        const Y_I2 = Y_O2 + SIDE_LONG * cos(ANGLE_I2);
        const ANGLE_J2 = ANGLE_SMALL * 4 - PI;
        const X_J2 = X_O2 - SIZE_LONG_MIDLINE * sin(ANGLE_J2);
        const Y_J2 = Y_O2 + SIZE_LONG_MIDLINE * cos(ANGLE_J2);
        const ANGLE_K2 = ANGLE_SMALL * 4.5 - PI;
        const X_K2 = X_O2 - SIDE_LONG * sin(ANGLE_K2);
        const Y_K2 = Y_O2 + SIDE_LONG * cos(ANGLE_K2);
        const ANGLE_A2E = ANGLE_EXTEND - HALF_ANGLE_SMALL;
        const X_A2E = X_A2 - PASTE_WIDTH * sin(ANGLE_A2E);
        const Y_A2E = Y_A2 + PASTE_WIDTH * cos(ANGLE_A2E);
        const ANGLE_O2E = ANGLE_EXTEND + HALF_ANGLE_SMALL;
        const X_O2E = X_O2 - PASTE_WIDTH * sin(ANGLE_O2E);
        const Y_O2E = Y_O2 - PASTE_WIDTH * cos(ANGLE_O2E);
        const ANGLE_O1E = ANGLE_EXTEND + HALF_ANGLE_SMALL;
        const X_O1E = X_O1 - PASTE_WIDTH * sin(ANGLE_O1E);
        const Y_O1E = Y_O1 + PASTE_WIDTH * cos(ANGLE_O1E);
        const ANGLE_K1E = PI - (ANGLE_EXTEND + ANGLE_MIDDLE + ANGLE_SMALL * 4.5 - PI);
        const X_K1E = X_K1 + PASTE_WIDTH * sin(ANGLE_K1E);
        const Y_K1E = Y_K1 - PASTE_WIDTH * cos(ANGLE_K1E);
        const ANGLE_A1E = ANGLE_EXTEND - HALF_ANGLE_SMALL;
        const X_A1E = X_A1 - PASTE_WIDTH * sin(ANGLE_A1E);
        const Y_A1E = Y_A1 - PASTE_WIDTH * cos(ANGLE_A1E);
        const ANGLE_B1E = ANGLE_BIG * 0.5 + ANGLE_EXTEND - ANGLE_90;
        const X_B1E = X_B1 + PASTE_WIDTH * cos(ANGLE_B1E);
        const Y_B1E = Y_B1 + PASTE_WIDTH * sin(ANGLE_B1E);
        const ANGLE_C1E1 = PI - (ANGLE_EXTEND + ANGLE_MIDDLE + HALF_ANGLE_SMALL);
        const X_C1E1 = X_C1 - PASTE_WIDTH * sin(ANGLE_C1E1);
        const Y_C1E1 = Y_C1 + PASTE_WIDTH * cos(ANGLE_C1E1);
        const ANGLE_C1E2 = PI - (ANGLE_EXTEND + ANGLE_MIDDLE - HALF_ANGLE_SMALL);
        const X_C1E2 = X_C1 + PASTE_WIDTH * sin(ANGLE_C1E2);
        const Y_C1E2 = Y_C1 + PASTE_WIDTH * cos(ANGLE_C1E2);
        const ANGLE_D1E1 = atan((X_D1 - X_C1) / (Y_C1 - Y_D1)) - ANGLE_EXTEND;
        const X_D1E1 = X_D1 - PASTE_WIDTH * sin(ANGLE_D1E1);
        const Y_D1E1 = Y_D1 + PASTE_WIDTH * cos(ANGLE_D1E1);
        const ANGLE_DE = atan((X_E1 - X_D1) / (Y_D1 - Y_E1));
        const ANGLE_D1E2 = ANGLE_DE - ANGLE_EXTEND;
        const X_D1E2 = X_D1 + PASTE_WIDTH * cos(ANGLE_D1E2);
        const Y_D1E2 = Y_D1 + PASTE_WIDTH * sin(ANGLE_D1E2);
        const ANGLE_E1E1 = ANGLE_EXTEND - ANGLE_DE;
        const X_E1E1 = X_E1 + PASTE_WIDTH * sin(ANGLE_E1E1);
        const Y_E1E1 = Y_E1 + PASTE_WIDTH * cos(ANGLE_E1E1);
        const ANGLE_EF = atan((X_F1 - X_E1) / (Y_E1 - Y_F1));
        const ANGLE_E1E2 = ANGLE_EXTEND - ANGLE_EF;
        const X_E1E2 = X_E1 + PASTE_WIDTH * cos(ANGLE_E1E2);
        const Y_E1E2 = Y_E1 - PASTE_WIDTH * sin(ANGLE_E1E2);
        const ANGLE_F1E1 = ANGLE_90 - (ANGLE_EF + ANGLE_EXTEND);
        const X_F1E1 = X_F1 + PASTE_WIDTH * sin(ANGLE_F1E1);
        const Y_F1E1 = Y_F1 + PASTE_WIDTH * cos(ANGLE_F1E1);
        const ANGLE_FG = atan((X_F1 - X_G1) / (Y_F1 - Y_G1));
        const ANGLE_F1E2 = ANGLE_90 - (ANGLE_FG + ANGLE_EXTEND);
        const X_F1E2 = X_F1 + PASTE_WIDTH * sin(ANGLE_F1E2);
        const Y_F1E2 = Y_F1 - PASTE_WIDTH * cos(ANGLE_F1E2);
        const ANGLE_G1E1 = ANGLE_FG - ANGLE_EXTEND;
        const X_G1E1 = X_G1 + PASTE_WIDTH * cos(ANGLE_G1E1);
        const Y_G1E1 = Y_G1 - PASTE_WIDTH * sin(ANGLE_G1E1);
        const ANGLE_GH = atan((X_G1 - X_H1) / (Y_G1 - Y_H1));
        const ANGLE_G1E2 = ANGLE_90 - (ANGLE_GH + ANGLE_EXTEND);
        const X_G1E2 = X_G1 + PASTE_WIDTH * sin(ANGLE_G1E2);
        const Y_G1E2 = Y_G1 - PASTE_WIDTH * cos(ANGLE_G1E2);
        const ANGLE_H1E1 = ANGLE_EXTEND - ANGLE_GH;
        const X_H1E1 = X_H1 + PASTE_WIDTH * cos(ANGLE_H1E1);
        const Y_H1E1 = Y_H1 + PASTE_WIDTH * sin(ANGLE_H1E1);
        const ANGLE_HI = atan((X_H1 - X_I1) / (Y_H1 - Y_I1));
        const ANGLE_H1E2 = ANGLE_EXTEND + ANGLE_HI;
        const X_H1E2 = X_H1 - PASTE_WIDTH * cos(ANGLE_H1E2);
        const Y_H1E2 = Y_H1 + PASTE_WIDTH * sin(ANGLE_H1E2);
        const ANGLE_I1E1 = ANGLE_EXTEND + ANGLE_HI;
        const X_I1E1 = X_I1 + PASTE_WIDTH * cos(ANGLE_I1E1);
        const Y_I1E1 = Y_I1 + PASTE_WIDTH * sin(ANGLE_I1E1);
        const ANGLE_IJ = atan((X_I1 - X_J1) / (Y_I1 - Y_J1));
        const ANGLE_I1E2 = ANGLE_EXTEND + ANGLE_IJ;
        const X_I1E2 = X_I1 + PASTE_WIDTH * cos(ANGLE_I1E2);
        const Y_I1E2 = Y_I1 - PASTE_WIDTH * sin(ANGLE_I1E2);
        const ANGLE_J1E1 = ANGLE_IJ - ANGLE_EXTEND;
        const X_J1E1 = X_J1 + PASTE_WIDTH * cos(ANGLE_J1E1);
        const Y_J1E1 = Y_J1 - PASTE_WIDTH * sin(ANGLE_J1E1);
        const ANGLE_JK = atan((X_J1 - X_K1) / (Y_K1 - Y_J1));
        const ANGLE_J1E2 = ANGLE_JK - ANGLE_EXTEND;
        const X_J1E2 = X_J1 - PASTE_WIDTH * cos(ANGLE_J1E2);
        const Y_J1E2 = Y_J1 - PASTE_WIDTH * sin(ANGLE_J1E2);
        appendLine(svg, OUTER_LINE_STYLE, X_B1E, X_B1, Y_B1E, Y_B1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_B1E, X_C1E1, Y_B1E, Y_C1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_C1E1, X_C1, Y_C1E1, Y_C1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_C1, X_C1E2, Y_C1, Y_C1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_C1E2, X_D1E1, Y_C1E2, Y_D1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_D1E1, X_D1, Y_D1E1, Y_D1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_D1, X_D1E2, Y_D1, Y_D1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_D1E2, X_E1E1, Y_D1E2, Y_E1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_E1E1, X_E1, Y_E1E1, Y_E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_E1, X_E1E2, Y_E1, Y_E1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_E1E2, X_F1E1, Y_E1E2, Y_F1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_F1E1, X_F1, Y_F1E1, Y_F1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_F1, X_F1E2, Y_F1, Y_F1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_F1E2, X_G1E1, Y_F1E2, Y_G1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_G1E1, X_G1, Y_G1E1, Y_G1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_G1, X_G1E2, Y_G1, Y_G1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_G1E2, X_H1E1, Y_G1E2, Y_H1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_H1E1, X_H1, Y_H1E1, Y_H1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_H1, X_H1E2, Y_H1, Y_H1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_H1E2, X_I1E1, Y_H1E2, Y_I1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_I1E1, X_I1, Y_I1E1, Y_I1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_I1, X_I1E2, Y_I1, Y_I1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_I1E2, X_J1E1, Y_I1E2, Y_J1E1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_J1E1, X_J1, Y_J1E1, Y_J1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_J1, X_J1E2, Y_J1, Y_J1E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_J1E2, X_K1E, Y_J1E2, Y_K1E, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_K1E, X_K1, Y_K1E, Y_K1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_O1, X_K1, Y_O1, Y_K1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_K1, X_J1, Y_K1, Y_J1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_J1, X_I1, Y_J1, Y_I1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_I1, X_H1, Y_I1, Y_H1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_H1, X_G1, Y_H1, Y_G1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_G1, X_F1, Y_G1, Y_F1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_F1, X_E1, Y_F1, Y_E1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_E1, X_D1, Y_E1, Y_D1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_D1, X_C1, Y_D1, Y_C1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_C1, X_B1, Y_C1, Y_B1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_B1, X_A1, Y_B1, Y_A1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O1, X_I1, Y_O1, Y_I1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O1, X_G1, Y_O1, Y_G1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O1, X_E1, Y_O1, Y_E1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O1, X_C1, Y_O1, Y_C1, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O1, X_A1, Y_O1, Y_A1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_O2, X_K2, Y_O2, Y_K2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_K2, X_J2, Y_K2, Y_J2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_J2, X_I2, Y_J2, Y_I2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_I2, X_H2, Y_I2, Y_H2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_H2, X_G2, Y_H2, Y_G2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_G2, X_F2, Y_G2, Y_F2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_F2, X_E2, Y_F2, Y_E2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_E2, X_D2, Y_E2, Y_D2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_D2, X_C2, Y_D2, Y_C2, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_C2, X_B2, Y_C2, Y_B2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_B2, X_A2, Y_B2, Y_A2, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O2, X_I2, Y_O2, Y_I2, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O2, X_G2, Y_O2, Y_G2, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O2, X_E2, Y_O2, Y_E2, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O2, X_C2, Y_O2, Y_C2, viewBox);
        appendLine(svg, INNER_LINE_STYLE, X_O2, X_A2, Y_O2, Y_A2, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_O1, X_O1E, Y_O1, Y_O1E, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_O1E, X_A1E, Y_O1E, Y_A1E, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_A1E, X_A1, Y_A1E, Y_A1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_K1E, X_K1, Y_K1E, Y_K1, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_O2, X_O2E, Y_O2, Y_O2E, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_O2E, X_A2E, Y_O2E, Y_A2E, viewBox);
        appendLine(svg, OUTER_LINE_STYLE, X_A2E, X_A2, Y_A2E, Y_A2, viewBox);
        this.textData = {
            X_A1,
            X_A2,
            X_C1,
            X_C2,
            X_E1,
            X_E2,
            X_G1,
            X_G2,
            X_I1,
            X_I2,
            X_K1,
            X_K2,
            Y_A1,
            Y_A2,
            Y_C1,
            Y_C2,
            Y_E1,
            Y_E2,
            Y_G1,
            Y_G2,
            Y_I1,
            Y_I2,
            Y_K1,
            Y_K2,
            ANGLE_SMALL_DEGREE
        };
    }
    textData;
    setTextsInfo() {
        const { infos, setSvgTextInfo } = this;
        const { X_A1, X_A2, X_C1, X_C2, X_E1, X_E2, X_G1, X_G2, X_I1, X_I2, X_K1, X_K2, Y_A1, Y_A2, Y_C1, Y_C2, Y_E1, Y_E2, Y_G1, Y_G2, Y_I1, Y_I2, Y_K1, Y_K2, ANGLE_SMALL_DEGREE } = this.textData;
        [
            {
                x: (X_A2 + X_C2) * 0.5,
                y: (Y_A2 + Y_C2) * 0.5,
                rotate: 0
            },
            {
                x: (X_G1 + X_I1) * 0.5,
                y: (Y_G1 + Y_I1) * 0.5,
                rotate: 360 - ANGLE_SMALL_DEGREE * 3
            },
            {
                x: (X_E2 + X_G2) * 0.5,
                y: (Y_E2 + Y_G2) * 0.5,
                rotate: ANGLE_SMALL_DEGREE * 2
            },
            {
                x: (X_A1 + X_C1) * 0.5,
                y: (Y_A1 + Y_C1) * 0.5,
                rotate: 0
            },
            {
                x: (X_I2 + X_K2) * 0.5,
                y: (Y_I2 + Y_K2) * 0.5,
                rotate: ANGLE_SMALL_DEGREE * 4
            },
            {
                x: (X_C1 + X_E1) * 0.5,
                y: (Y_C1 + Y_E1) * 0.5,
                rotate: -ANGLE_SMALL_DEGREE
            },
            {
                x: (X_G2 + X_I2) * 0.5,
                y: (Y_G2 + Y_I2) * 0.5,
                rotate: ANGLE_SMALL_DEGREE * 3
            },
            {
                x: (X_I1 + X_K1) * 0.5,
                y: (Y_I1 + Y_K1) * 0.5,
                rotate: 360 - ANGLE_SMALL_DEGREE * 4
            },
            {
                x: (X_C2 + X_E2) * 0.5,
                y: (Y_C2 + Y_E2) * 0.5,
                rotate: ANGLE_SMALL_DEGREE
            },
            {
                x: (X_E1 + X_G1) * 0.5,
                y: (Y_E1 + Y_G1) * 0.5,
                rotate: 360 - ANGLE_SMALL_DEGREE * 2
            }
        ].map(({ x, y, rotate }, n)=>{
            setSvgTextInfo(infos[n], x, y, rotate);
        });
    }
}
var DiceKind;
(function(DiceKind) {
    DiceKind[DiceKind["none"] = 0] = "none";
    DiceKind[DiceKind["four"] = 1] = "four";
    DiceKind[DiceKind["six"] = 2] = "six";
    DiceKind[DiceKind["eight"] = 4] = "eight";
    DiceKind[DiceKind["twelve"] = 8] = "twelve";
    DiceKind[DiceKind["twenty"] = 16] = "twenty";
    DiceKind[DiceKind["twentyFour"] = 32] = "twentyFour";
    DiceKind[DiceKind["ten"] = 64] = "ten";
    DiceKind[DiceKind["fourteen"] = 128] = "fourteen";
    DiceKind[DiceKind["sixteen"] = 256] = "sixteen";
    DiceKind[DiceKind["twentySix"] = 512] = "twentySix";
    DiceKind[DiceKind["sixty"] = 1024] = "sixty";
})(DiceKind || (DiceKind = {}));
const DiceKindCount = 11;
const DefaultDiceKind = 2047;
class DiceGenerator {
    batchCreate(createParameters) {
        createParameters.forEach((createParameter, index)=>{
            if (createParameter.id.length === 0) createParameter.id = `svg_index`;
        });
        return createParameters.map((createParameter)=>this.create(createParameter));
    }
    create({ id, diceKind, sideLength: SIDE_LENGTH, contents: CONTENTS, outerLineStyle: OUTER_LINE_STYLE, innerLineStyle: INNER_LINE_STYLE, textStyle: TEXT_STYLE, options: OPTIONS }) {
        if (id.length === 0) id = 'svg_0';
        const svg = this.createSvg();
        svg.setAttribute('id', id);
        const viewBox = {
            left: 999999,
            right: 0,
            top: 999999,
            bottom: 0
        };
        const infos = [];
        switch(diceKind){
            case DiceKind.four:
                CONTENTS.forEach((content)=>{
                    for(let i = 0; i < 3; ++i){
                        infos.push({
                            content,
                            x: 0,
                            y: 0,
                            rotate: 0
                        });
                    }
                });
                break;
            default:
                CONTENTS.forEach((content)=>{
                    infos.push({
                        content,
                        x: 0,
                        y: 0,
                        rotate: 0
                    });
                });
                break;
        }
        const PASTE_WIDTH = OPTIONS.PASTE_WIDTH || 0;
        const mmToPxScale = new DPIHelper().getMmToPxScale();
        switch(diceKind){
            case DiceKind.four:
                new DiceFace4(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            case DiceKind.six:
                new DiceFace6(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            case DiceKind.eight:
                new DiceFace8(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            case DiceKind.ten:
                new DiceFace10(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            case DiceKind.twelve:
                new DiceFace12(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            case DiceKind.twenty:
                new DiceFace20(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            case DiceKind.twentyFour:
                new DiceFace24(svg, SIDE_LENGTH, INNER_LINE_STYLE, OUTER_LINE_STYLE, viewBox, OPTIONS, mmToPxScale, infos, CONTENTS, PASTE_WIDTH, TEXT_STYLE).draw();
                break;
            default:
                break;
        }
        const width = `${viewBox.right}mm`;
        const height = `${viewBox.bottom}mm`;
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        const css = 'page,wrap{page-break-inside:avoid;}wrap{display:inline-flex;}';
        const result = {
            id,
            svg,
            css
        };
        return result;
    }
    createSvg = ()=>{
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('version', '1.1');
        svg.setAttribute('xmlns', SVG_NS);
        svg.setAttribute('xmlns:xlink', SVG_XLINKNS);
        return svg;
    };
}
