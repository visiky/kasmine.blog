数据结构设计


```js
let File = {
  name:"test",
  lineOffsets:[0],
  ast: {
    type:"Program",
    start:0,
    end:67,
    sourceFile:{},
    body:[{
      type:"VariableDeclaration",
      start:0,
      end:67, 
      sourceFile:{},
      kind:"var",
      declarations:[{
        type:"VariableDeclarator",
        start:4,
        end:67,
        sourceFile:{},
        id:{type:"Identifier",start:4,end:5,sourceFile:{},name:"a"},
        init:{ // Node
          type:"ObjectExpression",
          start:8,
          end:67,
          sourceFile:{},
          properties:null,
          objType:{
            props: {
              a: {}, // exports.AVAL
              name: {},
              age: {}
            },
            proto:{},
            name:"a",
            maybeProps:null,
            origin:"test",
            originNode:{} // init Node
          }
        }
      }],  // [Node, Node, ...]
      commentsBefore:null
    }],     // [Node]
    sourceType:"script"
  },
  text:"var a = {name: 'xinming',age: [1, {prev: 2, next: 3}];\n         a.",
  scope:null,
  hasAstral:false
}
```