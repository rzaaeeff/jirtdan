/*

 Copyright (c) 2017 Jirtdan Team and other collaborators

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

"use strict";
/*jshint esversion: 6*/
import {
    BaseControl,
    DEFAULT_STROKE_COLOR,
    DEFAULT_STROKE_WIDTH,
    DEFAULT_FILL_COLOR,
    DEBUG
} from '../BaseControl.js'
import {ConnectionPin} from '../ConnectionPin.js'

const LOGTAG = "AndGate";

/**
 * Control for AND gate.
 *
 * Truth table:
 * |In1|In2|Out|
 * |0  |0  |0  |
 * |0  |1  |0  |
 * |1  |0  |0  |
 * |1  |1  |1  |
 */
export class AndGate extends BaseControl {

    /**
     * Constructor for AndGate
     * @param paper raphael paper object.
     */
    constructor(paper) {
        super(paper);
        this.inputPin1Value = 0;
        this.inputPin2Value = 0;
    }

    /**
     * Draw the component surface.
     */
    draw() {
        super.draw();

        this.componentBodyShape = this.paper.path("m 58.611201,1.1397665 c 9.55485,0.18892 20.16562,5.82395 " +
            "24.0335,17.2506995 4.9232,15.87108 -9.03622,29.35593 -20.8054,30.21669 -3.85823,0.45079 " +
            "-7.74776,0.13486 -11.62055,0.22897 -6.74559,0 -13.49119,0 -20.23678,0 0,-15.89882 0,-31.79764 " +
            "0,-47.6964595 9.54305,6e-5 19.08632,-1.4e-4 28.62923,10e-5 z");
        this.componentBodyShape.attr("stroke", DEFAULT_STROKE_COLOR);
        this.componentBodyShape.attr("stroke-width", DEFAULT_STROKE_WIDTH);
        this.componentBodyShape.attr("stroke-linejoin", "round");
        this.componentBodyShape.attr("stroke-miterlimit", 4);

        this.componentBodyFill = this.paper.path("m 31.061892,2.5815355 c 9.19315,5e-5 18.38665,-2.3e-4 " +
            "27.579611,0 9.22798,0.18246 19.421691,5.6541 23.087521,16.4532025 2.30565,7.451782 " +
            "0.22309,14.191732 -3.92241,19.402882 -4.14843,5.21484 -10.395901,8.69029 " +
            "-15.982541,9.09888 a 1.0330703,1.2574718 0 0 0 -0.0365,0.004 c -3.7468,0.43777 " +
            "-7.609851,0.12826 -11.542571,0.22383 l 0.0204,-4.7e-4 -19.2035,0 0,-45.1816745 z");
        this.componentBodyFill.attr("stroke-width", 1);
        this.componentBodyFill.attr("stroke", DEFAULT_FILL_COLOR);
        this.componentBodyFill.attr("fill", DEFAULT_FILL_COLOR);

        this.componentBodyGradient = this.paper.path("m 31.082459,2.252571 0,24.159714 c 3.12863,-2.275521 " +
            "6.62158,-4.297522 10.765451,-5.053942 3.297449,-0.41071 6.757419,0.66406 8.796369,2.799571 " +
            "2.05993,1.709771 3.767,3.940621 6.649721,4.805901 2.48868,0.43561 5.09369,0.24618 7.60804,0.0319 " +
            "6.20929,-0.84447 12.166581,-2.59522 17.790441,-4.852561 -0.0646,-1.759691 -0.3663,-3.575801 " +
            "-0.94218,-5.437041 C 78.084471,7.907001 67.88986,2.435011 58.66187,2.252551 c -9.192961,-2.2e-4 " +
            "-18.386261,5e-5 -27.579411,0 z");
        this.componentBodyGradient.attr("stroke-width", 0);
        this.componentBodyGradient.attr("fill", "90-#0066ff-#fff");

        this.componentInputWire1 = this.paper.path("m 10.000001,11.233446 19.55419,0");
        this.componentInputWire1.attr("stroke", DEFAULT_STROKE_COLOR);
        this.componentInputWire1.attr("stroke-width", DEFAULT_STROKE_WIDTH);

        this.componentInputWire2 = this.paper.path("m 10.000001,38.765746 19.55419,0");
        this.componentInputWire2.attr("stroke", DEFAULT_STROKE_COLOR);
        this.componentInputWire2.attr("stroke-width", DEFAULT_STROKE_WIDTH);

        this.componentOutputWire = this.paper.path("m 83.523741,24.999596 19.554189,0");
        this.componentOutputWire.attr("stroke", DEFAULT_STROKE_COLOR);
        this.componentOutputWire.attr("stroke-width", DEFAULT_STROKE_WIDTH);

        this.inputPin1 = new ConnectionPin(this, 5, 11, "in");
        this.inputPin2 = new ConnectionPin(this, 5, 39, "in");
        this.outputPin = new ConnectionPin(this, 109, 25, "out");
    }

    /**
     * Initialize the component.
     */
    initControl() {
        super.initControl();
        const _this = this;

        this.inputPin1.addStateChangeListener(
            function (newState) {
                _this.inputPin1Value = newState;
                _this.outputPin.notifyStateChange(_this.getValue());
            });

        this.inputPin2.addStateChangeListener(
            function (newState) {
                _this.inputPin2Value = newState;
                _this.outputPin.notifyStateChange(_this.getValue());
            });

        this.setShapes([
            this.componentBodyShape,
            this.componentBodyFill,
            this.componentBodyGradient,
            this.componentInputWire1,
            this.componentInputWire2,
            this.componentOutputWire]);

        this.addInputPins(this.inputPin1, this.inputPin2);
        this.addOutputPins(this.outputPin);
    }

    /**
     * An event fired when element is selected.
     * @param event
     */
    onSelect(event) {
        super.onSelect(event);
        this.glow = this.componentBodyShape.glow();
        this.glow.toBack();
    }

    /**
     * Get the value.
     * @returns {*|number}
     */
    getValue() {
        return this.inputPin1Value && this.inputPin2Value;
    }
}
