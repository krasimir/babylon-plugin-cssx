import { eq } from './utilities';

export default function (Babylon) {

  var { TokenType, tt, tc } = Babylon;

  tt.cssxStart = new TokenType("CSSXStart");
  tt.cssxEnd = new TokenType("CSSXEnd");
  tt.cssxSelector = new TokenType("CSSXSelector");
  tt.cssxRulesStart = new TokenType("CSSXRulesStart");
  tt.cssxRulesEnd = new TokenType("CSSXRulesEnd");
  tt.cssxProperty = new TokenType("CSSXProperty");
  tt.cssxValue = new TokenType("CSSXValue");
  tt.cssxNested = new TokenType("CSSXNested");
  tt.cssxNestedStart = new TokenType("CSSXNestedStart");
  tt.cssxNestedEnd = new TokenType("CSSXNestedEnd");

  tt.cssxRulesStart.updateContext = function (prevType) {
    if (eq.type(prevType, tt.cssxSelector)) this.state.context.push(tc.cssxRules);
  };
  tt.cssxRulesEnd.updateContext = function (prevType) {
    if (
      eq.type(prevType, tt.cssxValue) ||
      eq.type(prevType, tt.cssxRulesStart) ||
      eq.type(prevType, tt.semi) ||
      eq.type(prevType, tt.cssxNestedEnd)
    ) {
      this.state.context.length -= 1; // out of cssxRules
    }
  };
  tt.cssxEnd.updateContext = function () {
    this.cssxDefinitionOut();
    this.cssxOut();
  };
  tt.cssxSelector.updateContext = function () {
    this.state.context.length -= 1;
  };

  tt.cssxNestedEnd.updateContext = function () {
    this.cssxNestedOut();
  };

};