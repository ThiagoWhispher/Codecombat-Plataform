require.register("schemas/concepts", function(exports, require, module) {
var concepts;

concepts = [
  {
    concept: 'advanced_strings',
    name: '',
    description: '',
    automatic: '??',
    deprecated: true
  }, {
    concept: 'algorithms',
    name: '',
    description: '',
    automatic: false,
    deprecated: true
  }, {
    concept: 'boolean_logic',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'basic_html',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'basic_css',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'basic_web_scripting',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'intermediate_html',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'intermediate_css',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'intermediate_web_scripting',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'advanced_html',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'advanced_css',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'advanced_web_scripting',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'input_handling',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'while_loops',
    name: '',
    description: '',
    automatic: '',
    deprecated: true
  }, {
    concept: 'advanced_css_rules',
    name: 'Advanced CSS Rules',
    description: 'CSS Rules introduced in WD3+.',
    automatic: true
  }, {
    concept: 'advanced_css_selectors',
    name: 'Advanced CSS Selectors',
    description: 'CSS Selectors introduced in WD3+.',
    automatic: true
  }, {
    concept: 'advanced_html_attributes',
    name: 'Advanced HTML Attributes',
    description: 'HTML Attributes introduced in WD3+.',
    automatic: true
  }, {
    concept: 'advanced_html_tags',
    name: 'Advanced HTML Tags',
    description: 'HTML Tags introduced in WD3+.',
    automatic: true
  }, {
    concept: 'algorithm_average',
    name: 'Algorithm Average',
    description: 'Summing multiple values and dividing by the number of values.',
    automatic: false
  }, {
    concept: 'algorithm_find_minmax',
    name: 'Algorithm Find Min/Max',
    description: 'Finding the optimal value out of collection of values.',
    automatic: false
  }, {
    concept: 'algorithm_search_binary',
    name: 'Algorithm Search Binary',
    description: 'Implementations of the binary search algorithm',
    automatic: false
  }, {
    concept: 'algorithm_search_graph',
    name: 'Algorithm Search Graph',
    description: 'Implementations of graph search algorithms.',
    automatic: false
  }, {
    concept: 'algorithm_sort',
    name: 'Algorithm Sort',
    description: 'Sorting an array.',
    automatic: false
  }, {
    concept: 'algorithm_sum',
    name: 'Algorithm Sum',
    description: 'Summing multiple values.',
    automatic: false
  }, {
    concept: 'arguments',
    name: 'Arguments',
    description: 'Using arguments when calling a function',
    automatic: true,
    tagger: 'CallExpression.arguments>*'
  }, {
    concept: 'arithmetic',
    name: 'Arithmetic',
    description: 'Adding, subtracting, multiplication or dividing.',
    automatic: true,
    tagger: function(ast) {
      return _.some(ast.find('BinaryExpression'), function(n) {
        var ref, ref1;
        return ((ref = n.operator) === '+' || ref === '-' || ref === '*' || ref === '/') && ((ref1 = n.right) != null ? ref1.value : void 0) !== 1;
      });
    }
  }, {
    concept: 'array_2d',
    name: '2D Array',
    description: 'Two-dimensional arrays. Arrays containing arrays.',
    automatic: true,
    tagger: 'MemberExpression[computed=true].object>MemberExpression[computed=true]'
  }, {
    concept: 'array_index',
    name: 'Array Indexing',
    description: 'Using indexes to access elements of an array.',
    automatic: false
  }, {
    concept: 'array_iterating',
    name: 'Iterating Over Arrays',
    description: 'Going through elements of an array programmatically.',
    automatic: false
  }, {
    concept: 'array_literals',
    name: 'Array Literals',
    description: 'Constructing an array using [] notation.',
    automatic: true,
    tagger: 'ArrayExpression'
  }, {
    concept: 'array_searching',
    name: 'Array Searching',
    description: 'Searching through an array for an element.',
    automatic: false
  }, {
    concept: 'array_sorting',
    name: 'Array Sorting',
    description: 'Sorting using Array.sort.',
    automatic: false
  }, {
    concept: 'arrays',
    name: 'Arrays',
    description: 'Anything involving arrays.',
    automatic: true
  }, {
    concept: 'basic_css_rules',
    name: 'Basic CSS rules',
    description: 'CSS Rules introduced in WD1.',
    automatic: true
  }, {
    concept: 'basic_css_selectors',
    name: 'Basic CSS selectors',
    description: 'CSS Selectors introduce in WD1.',
    automatic: true
  }, {
    concept: 'basic_html_attributes',
    name: 'Basic HTML Attributes',
    description: 'HTML Attributes introduced in WD1.',
    automatic: true
  }, {
    concept: 'basic_html_tags',
    name: 'Basic HTML Tags',
    description: 'HTML Tags introduced in WD1.',
    automatic: true
  }, {
    concept: 'basic_syntax',
    name: 'Basic Syntax',
    description: 'Writing code of any sort.',
    automatic: true,
    tagger: '*'
  }, {
    concept: 'binary',
    name: 'Binary',
    description: 'Implementations of binary, (0b001100, toString(2))',
    automatic: 'Sometimes',
    tagger: function(ast) {
      return _.some(ast.find('CallExpression.callee>MemberExpression.property>Identifier[name="toString"]'), function(n) {
        var call;
        call = n.parent.parent;
        if (call["arguments"].length !== 1) {
          return false;
        }
        return call.matches('Literal[value=2]');
      });
    }
  }, {
    concept: 'boolean_and',
    name: 'Boolean And',
    description: 'Using boolean and/&&.',
    automatic: true,
    tagger: 'LogicalExpression[operator="&&"]'
  }, {
    concept: 'boolean_equality',
    name: 'Boolean Equality',
    description: 'Using == and !=.',
    automatic: true,
    tagger: 'BinaryExpression[operator="=="]'
  }, {
    concept: 'boolean_greater_less',
    name: 'Boolean Greater/Less',
    description: 'Using >, >=, <, and <=.',
    automatic: 'Maybe, use in for loops confuses the issue',
    tagger: 'BinaryExpression[operator=">"],BinaryExpression[operator="<"],BinaryExpression[operator=">="],BinaryExpression[operator="<="]'
  }, {
    concept: 'boolean_logic_shortcircuit',
    name: 'Boolean Logic Shortcircuiting',
    description: 'Writing longer if-conditionals with potential failing operations in the conditional. (if a && b.c > 0)',
    automatic: false
  }, {
    concept: 'boolean_not',
    name: 'Boolean Not',
    description: 'Using boolean not/!.',
    automatic: 'Unsure, depends on if we teach !blah for null checks',
    tagger: 'UnaryyExpression[operator="!"]'
  }, {
    concept: 'boolean_operator_precedence',
    name: 'Boolean Operator Precedence',
    description: 'Chaining booleans together (if (a || b) && c)',
    automatic: false
  }, {
    concept: 'boolean_or',
    name: 'Boolean Or',
    description: 'Using boolean or/||.',
    automatic: true,
    tagger: 'LogicalExpression[operator="||"]'
  }, {
    concept: 'bootstrap',
    name: 'Bootstrap',
    description: 'Webpage structure involves Bootstrap in some way.',
    automatic: true
  }, {
    concept: 'break_statements',
    name: 'Break Statements',
    description: 'Using the break statement.',
    automatic: true,
    tagger: 'BreakStatement'
  }, {
    concept: 'classes',
    name: 'Classes',
    description: 'Defining a class.',
    automatic: true
  }, {
    concept: 'continue_statements',
    name: 'Continue Statements',
    description: 'Using the continue statement.',
    automatic: true,
    tagger: 'ContinueStatement'
  }, {
    concept: 'dom_events',
    name: 'DOM Events',
    description: 'Hooking into DOM events in the browser.',
    automatic: true
  }, {
    concept: 'dynamic_styling',
    name: 'Dynamic Styling',
    description: 'Styling the page with JavaScript.',
    automatic: true
  }, {
    concept: 'event_concurrency',
    name: 'Event Concurrency',
    description: 'Running two threads at the same time (hero & pet)',
    automatic: false
  }, {
    concept: 'event_data',
    name: 'Event Data',
    description: 'Accessing an event handler\'s parameter\'s properties.',
    automatic: false
  }, {
    concept: 'event_handlers',
    name: 'Event Handlers',
    description: 'Using on() to monitor for certain events.',
    automatic: true
  }, {
    concept: 'for_loops',
    name: 'For Loops',
    description: 'Using a for-loop.',
    automatic: true,
    tagger: 'ForStatement'
  }, {
    concept: 'for_loops_nested',
    name: 'Nested For Loops',
    description: 'Using a for-loop inside another for-loop.',
    automatic: true,
    tagger: 'ForStatement ForStatement'
  }, {
    concept: 'for_loops_range',
    name: 'For Loops Range',
    description: 'If the level focuses on ranges outside of 0 to arr.length.',
    automatic: false
  }, {
    concept: 'functions',
    name: 'Functions',
    description: 'Defining functions.',
    automatic: true,
    tagger: 'Function'
  }, {
    concept: 'game_ai',
    name: 'Game AI',
    description: 'Scripting AI for units inside Game Dev.',
    automatic: true
  }, {
    concept: 'game_goals',
    name: 'Game Goals',
    description: 'Setting up goals inside Game Dev.',
    automatic: true
  }, {
    concept: 'game_spawn',
    name: 'Game Spawn',
    description: 'Spawning units inside Game Dev.',
    automatic: true
  }, {
    concept: 'graphics',
    name: 'Graphics',
    description: 'Drawing methods (flowers, canvas)',
    automatic: 'Maybe, by detectecting the flower ring is required'
  }, {
    concept: 'graphs',
    name: 'Graphs',
    description: 'Implementations of the graph data structure.',
    automatic: false
  }, {
    concept: 'heaps',
    name: 'Heaps',
    description: 'Implementations of the heap data structure.',
    automatic: false
  }, {
    concept: 'if_else_statements',
    name: 'If/Else Statements',
    description: 'Using elif/else if statements.',
    automatic: true,
    tagger: 'if.alternate>*'
  }, {
    concept: 'if_statements',
    name: 'If Statements',
    description: 'Using if statements.',
    automatic: true,
    tagger: 'if'
  }, {
    concept: 'if_statements_nested',
    name: 'Nested If Statemnts',
    description: 'Using if statements inside other if statements.',
    automatic: true,
    tagger: 'if if'
  }, {
    concept: 'indexing',
    name: 'Array Indexes',
    description: 'Accessing specific elements using indexes.',
    automatic: true,
    tagger: 'MemberExpression[computed=true]'
  }, {
    concept: 'input_handling_flags',
    name: 'Input Handling - Flags',
    description: 'Handling input in the form of flags.',
    automatic: true
  }, {
    concept: 'input_handling_keyboard',
    name: 'Input Handling - Keyboard',
    description: 'Handling input in the form of keyboards.',
    automatic: true
  }, {
    concept: 'input_handling_mouse',
    name: 'Input Handling - Mouse',
    description: 'Handling input in the form of the mouse.',
    automatic: true
  }, {
    concept: 'intermediate_css_rules',
    name: 'Intermediate CSS Rules',
    description: 'CSS Rules introduced in WD2.',
    automatic: true
  }, {
    concept: 'intermediate_css_selectors',
    name: 'Intermediate CSS Selectors',
    description: 'CSS Selectors introduced in WD2.',
    automatic: true
  }, {
    concept: 'intermediate_html_attributes',
    name: 'Intermediate HTML Attributes',
    description: 'HTML Attributes introduced in WD2.',
    automatic: true
  }, {
    concept: 'intermediate_html_tags',
    name: 'Intermediate HTML Tags',
    description: 'HTML Tags introduced in WD2.',
    automatic: true
  }, {
    concept: 'jquery',
    name: 'jQuery',
    description: 'The level contains $().',
    automatic: true
  }, {
    concept: 'jquery_animations',
    name: 'jQuery Animations',
    description: 'The level uses $().animate().',
    automatic: true
  }, {
    concept: 'jquery_filtering',
    name: 'jQuery Element Filtering',
    description: 'The level filters down groups of elements using jQuery methods.',
    automatic: true
  }, {
    concept: 'jquery_selectors',
    name: 'jQuery Selectors',
    description: 'The level uses jQuery selectors.',
    automatic: true
  }, {
    concept: 'length',
    name: 'Array Length',
    description: 'If the length of an array or string is checked.',
    automatic: true,
    tagger: 'MemberExpression.property>Identifier[name="length"]'
  }, {
    concept: 'math_geometry',
    name: 'Geometry',
    description: 'Finding the perimeter, or area of things.',
    automatic: false
  }, {
    concept: 'math_operations',
    name: 'Math Library Operations',
    description: 'Using Math library operations like Math.sqrt, Math.pow',
    automatic: true,
    tagger: 'CallExpression>MemberExpression:matches(.object>Identifier[name=Math]).property:matches(>Identifier[name=sqrt],>Identifier[name=pow],>Identifier[name=abs])'
  }, {
    concept: 'math_trigonometry',
    name: 'Trigonometry',
    description: 'Using Math.sin/Math.cos/Math.tan',
    automatic: true,
    tagger: 'CallExpression>MemberExpression:matches(.object>Identifier[name=Math]).property:matches(>Identifier[name=sin],>Identifier[name=cos],>Identifier[name=tan])'
  }, {
    concept: 'object_literals',
    name: 'Object Literals',
    description: 'Creating Object Literals (Python Dictionaries)',
    automatic: true,
    tagger: 'ObjectExpression'
  }, {
    concept: 'parameters',
    name: 'Parameters',
    description: 'Functions in this level have parameters.',
    automatic: '??',
    tagger: 'Function.params>*'
  }, {
    concept: 'property_access',
    name: 'Accessing Properties',
    description: 'An object\'s properties are accessed (pos, gold)',
    automatic: true,
    tagger: ':not(CallExpression,AssignmentExpression)>MemberExpression'
  }, {
    concept: 'property_assignment',
    name: 'Assigning Properties',
    description: 'Assigning to an object\'s properties. (obj.pos.x = 10)',
    automatic: true,
    tagger: 'AssignmentExpression.left>MemberExpression'
  }, {
    concept: 'queues',
    name: 'Data Structures - Queues',
    description: 'This level focuses on Queue-style data structures.',
    automatic: false
  }, {
    concept: 'reading_docs',
    name: 'Reading the Docs',
    description: 'This level focuses on reading the documentation.',
    automatic: false
  }, {
    concept: 'recursion',
    name: 'Recursion',
    description: 'This level teaches about recursion, (calling a function inside itself)',
    automatic: true
  }, {
    concept: 'return_statements',
    name: 'Return Statements',
    description: 'Using the return statement.',
    automatic: true,
    tagger: 'ReturnStatement'
  }, {
    concept: 'stacks',
    name: 'Data Structures - Stacks',
    description: 'Implementations of the stack data structure.',
    automatic: false
  }, {
    concept: 'strings',
    name: 'Strings',
    description: 'Using string literals.',
    automatic: 'Yes, assuming this means string literals.',
    tagger: function(ast) {
      return _.some(ast.find("Literal"), function(e) {
        return typeof e.value === 'string';
      });
    }
  }, {
    concept: 'strings_concatenation',
    name: 'String Concatenation',
    description: 'Using the string concatenation operator +.',
    automatic: false
  }, {
    concept: 'strings_substrings',
    name: 'Substring',
    description: 'Using substr or substring.',
    automatic: true,
    tagger: 'CallExpression>MemberExpression>Identifier[name="substr"],CallExpression>MemberExpression>Identifier[name="substring"]'
  }, {
    concept: 'trees',
    name: 'Data Structures - Trees',
    description: 'Implementations of the tree data structure.',
    automatic: false
  }, {
    concept: 'variables',
    name: 'Variables',
    description: 'Storing data in variables.',
    automatic: true,
    tagger: 'VariableDeclaration'
  }, {
    concept: 'vectors',
    name: 'Vectors',
    description: 'Using Vectors, like new Vector() or common Vector methods like rotate, magnitude, dot, heading, normalize, and limit',
    automatic: true,
    tagger: 'Identifier[name=Vector]'
  }, {
    concept: 'while_condition_loops',
    name: 'While Loops with Conditionals',
    description: 'While loops with a breaking conditional.',
    automatic: true,
    tagger: 'WhileStatement.test>*:not(Literal)'
  }, {
    concept: 'while_loops_simple',
    name: 'While Loops',
    description: 'Simple while-true loops.',
    automatic: true,
    tagger: 'WhileStatement.test>Literal'
  }, {
    concept: 'while_loops_nested',
    name: 'Nested While Loops',
    description: 'While loops inside other while loops.',
    automatic: true,
    tagger: 'WhileStatement.body WhileStatement'
  }, {
    concept: 'xy_coordinates',
    name: 'Cartesian Coordinates',
    description: 'This level uses XY coordinates to navigate: any time we use a method .*XY or use variables or properties named x or y',
    automatic: true,
    tagger: function(ast) {
      if (!(ast.find('MemberExpression.object>Identifier[name="y"]').length > 0)) {
        return false;
      }
      if (!(ast.find('MemberExpression.object>Identifier[name="x"]').length > 0)) {
        return false;
      }
      return true;
    }
  }
];

module.exports = concepts;
});

;
//# sourceMappingURL=/javascripts/app/schemas/concepts.js.map