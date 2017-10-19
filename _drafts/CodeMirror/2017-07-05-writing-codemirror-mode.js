// ---
// layout: post
// title: Writing CodeMirror Modes
// tags: 
// ---


(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";



  CodeMirror.defineMode("myCodeMirrorMode", function (config, parserConfig) {


    // Parser

    var atomicTypes = { "atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true };

    function Lexical(indented, column, type, align, prev, info) {
      this.indented = indented;
      this.column = column;
      this.type = type;
      this.prev = prev;
      this.info = info;
      if (align != null) this.align = align;
    }


    // Used as scratch variables to communicate multiple values without
    // consing up tons of objects.
    var type, content;
    function ret(tp, style, cont) {
      type = tp; content = cont;
      return style;
    }

    function tokenBase(stream, state) {
      let ch = stream.next();
      if (ch == "/") {
        if (stream.eat("*")) {
          state.tokenize = tokenComment;
          return tokenComment(stream, state);
        }
      }
    }


    /**
     * 解析 评论 token ，可自定义
     * @param {*} stream 
     * @param {*} state 
     */
    function tokenComment(stream, state) {
      var maybeEnd = false, ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "*");
      }
      return ret("comment", "comment");
    }

    // Interface

    return {
      startState(basecolumn) {
        /* an object that is always passed when reading a token, and which can be mutated by the tokenizer */
        let state = {
          context: '',
          tokenize: tokenBase,
          htmlState: null,
        };

        return state;
      },
      /**
       * the most important part
       * @param {*} stream 
       * @param {*} state 
       * @returns {string|null} style or null
       */
      token(stream, state) {
        // 从stream中读取 token，选择性的更新 state
      },
      /**
       * 提供智能缩进
       * @param {*} state 
       * @param {*} textAter 
       */
      indent(state, textAter) {
        return CodeMirror.Pass; // 表明无法提供精确的缩进
      },
      copyState: function (state) {
        let htmlMode = CodeMirror.getMode(config, "text/html");
        return {
          htmlState: state.htmlState && CodeMirror.copyState(htmlMode, state.htmlState),
        }
      },
      electricInput: /^\s*(?:case .*?:|default:|\{|\})$/, // 比较难理解
      blockCommentStart: jsonMode ? null : "/*",
      blockCommentEnd: jsonMode ? null : "*/",
      lineComment: jsonMode ? null : "//",  // string that starts a line comment

    }


  });
});