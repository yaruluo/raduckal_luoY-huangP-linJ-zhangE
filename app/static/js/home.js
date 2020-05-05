//-----------------------------------------------------------
//state population data

//mapping population data by state
let state_data = new Map(); //new Map object
let state_arr = []; //for finding max and min values
let state_abbrev = {};
let dataset = {'children': []}; //array specifically for population chart
let i; //indexing
for (i = 0; i < data.length; i++){
  state_data.set(data[i]['state'], data[i]['pop']);
  state_arr.push(parseInt(data[i]['pop']));
  state_abbrev[data[i]['state']] = data[i]['abbrev'];
  dataset['children'].push({'Name': data[i]['abbrev'], 'Count': data[i]['pop']});
}
state_data = Object.assign(state_data, {title: "Population (in millions)"});
let max = state_arr.reduce(function(a, b) { //get max population
    return Math.max(a, b);
});
let min = state_arr.reduce(function(a, b) { //get min population
    return Math.min(a, b);
});
//console.log(dataset);

//colors, from Observable HQ website
let schemeBlues = ["#f7fbff","#f6faff","#f5fafe","#f5f9fe","#f4f9fe","#f3f8fe","#f2f8fd","#f2f7fd","#f1f7fd","#f0f6fd","#eff6fc","#eef5fc","#eef5fc","#edf4fc","#ecf4fb","#ebf3fb","#eaf3fb","#eaf2fb","#e9f2fa","#e8f1fa","#e7f1fa","#e7f0fa","#e6f0f9","#e5eff9","#e4eff9","#e3eef9","#e3eef8","#e2edf8","#e1edf8","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"];
//console.log(schemeBlues.length)

//variables
let us;
let pathData;
let path;

var render_map = async function(data, color, colorScale, min, max, num){
  var space = document.getElementById('chart');
  space.innerHTML = "";

  pathData = await getMapData();
  path = d3.geoPath();
  let format = d3.format("d");

  //create map
  const svg = d3.select('#chart')
    .append('svg')
    .attr("viewBox", [0, 0, 975, 610]);

  //fill in state colors
  svg.append("g")
    .selectAll("path")
    .data(pathData)
    .enter().append("a")
    .attr("xlink:href", d => "/"+ d.properties.name)
      .append("path")
        .attr("fill", d => color(data.get(d.properties.name)))
        .attr("d", path);

  //label all the states
  svg.selectAll("text")
    .data(pathData)
    .enter().append("svg:text")
      .text(d => state_abbrev[d.properties.name])
      .attr("x", d => path.centroid(d)[0])
      .attr("y", d=> path.centroid(d)[1])
      .attr("text-anchor","middle")
      .attr('font-size','8px')
      .attr('font-weight', 'bold');

  //create state borders
  svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path);

  legend = g => {
    const x = d3.scaleLinear()
        .domain(d3.extent(colorScale.domain()))
        .rangeRound([0, 300]);

    g.selectAll("rect")
      .data(colorScale.range().map(d => colorScale.invertExtent(d)))
      .join("rect")
        .attr("height", 8)
        .attr("x", d => x(d[0]))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("fill", d => color(d[0]));

    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.title);

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(d3.format(num))
        .tickValues(colorScale.range().slice(1).map(d => colorScale.invertExtent(d)[0])))
      .select(".domain")
        .remove();
  };

  svg.append("g")
    .attr("transform", "translate(600,40)")
    .call(legend);
};

const getMapData = async () => {
  us = await d3.json('static/json/states-albers-10m.json');
  return topojson.feature(us, us.objects.states).features;
};

var render_pop_chart = function(){
  var space = document.getElementById('chart');
  space.innerHTML = "";

  var diameter = 1000;
  var color = d3.scaleOrdinal(d3.schemeTableau10);

  var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
      return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    node.append("title")
      .text(function(d) {
        return d.Name + ": " + d.Count;
      });

    node.append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d,i) {
        return color(i);
      });

    node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
        return d.r/5;
      })
      .attr("fill", "white");

    node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
      return d.r/5;
    })
    .attr("fill", "white");

    d3.select(self.frameElement)
      .style("height", diameter + "px");

};

//-----------------------------------------------------------
//ethnicity data
var render_eth_chart = function(){
  var space = document.getElementById('chart');
  space.innerHTML = "";
  var columns = ['hispanic', 'white', 'black', 'native', 'asian', 'pacific'];
  // console.log(d3.stack().keys(columns)(eth_data));
  var width = 975,
      height = width,
      innerRadius = 180,
      outerRadius = Math.min(width, height) / 2;
  var arc = d3.arc()
      .innerRadius(d =>y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.abbrev))
      .endAngle(d => x(d.data.abbrev) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);
  var x = d3.scaleBand()
      .domain(eth_data.map(d => d.abbrev))
      .range([0, 2 * Math.PI])
      .align(0);
  var y = d3.scaleLinear()
      .domain([0, d3.max(eth_data, d => d.total)])
      .range([innerRadius, outerRadius]);
  var z = d3.scaleOrdinal()
      .domain(columns)
      .range(["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#c4bfff"].reverse());
  var xAxis = g => g
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .call(g => g.selectAll("g")
        .data(eth_data)
        .enter().append("g")
          .attr("transform", d => `
            rotate(${((x(d.abbrev) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
            translate(${innerRadius},0)
          `)
          .call(g => g.append("line")
              .attr("x2", -5)
              .attr("stroke", "#000"))
          .call(g => g.append("text")
              .attr("transform", d => (x(d.abbrev) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                  ? "rotate(90)translate(0,16)"
                  : "rotate(-90)translate(0,-9)")
              .text(d => d.abbrev)))
  var yAxis = g => g
      .attr("text-anchor", "middle")
      .call(g => g.append("text")
          .attr("y", d => -y(y.ticks(5).pop()))
          .attr("dy", "-1em")
          .text("Population"))
      .call(g => g.selectAll("g")
        .data(y.ticks(5).slice(1))
        .enter().append("g")
          .attr("fill", "none")
          .call(g => g.append("circle")
              .attr("stroke", "#000")
              .attr("stroke-opacity", 0.5)
              .attr("r", y))
          .call(g => g.append("text")
              .attr("y", d => -y(d))
              .attr("dy", "0.35em")
              .attr("stroke", "#fff")
              .attr("stroke-width", 5)
              .text(y.tickFormat(5, "s"))
           .clone(true)
              .attr("fill", "#000")
              .attr("stroke", "none")))
  var legend = g => g.append("g")
    .selectAll("g")
    .data(columns.reverse())
    .enter().append("g")
      .attr("transform", (d, i) => `translate(-40,${(i - 5 / 2) * 20})`)
      .call(g => g.append("rect")
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", z))
      .call(g => g.append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", "0.35em")
          .text(d => d))
  const svg = d3.select('#chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto");

  svg.append('g')
    .selectAll('g')
    .data(d3.stack().keys(columns)(eth_data))
    .enter().append('g')
      .attr('fill', d => z(d.key))
    .selectAll('path')
    .data(d => d)
    .enter().append('path')
      .attr('d', arc);

  svg.append('g')
      .call(xAxis);

  svg.append('g')
      .call(yAxis);

  svg.append('g')
      .call(legend);
};

var render_eth_map = function() {
  var space = document.getElementById('chart');
  space.innerHTML = "";


};

//-----------------------------------------------------------
//gender data
let gen_arr = [];
let gen_map = new Map();
let gen_map_val = [];
for (i = 0; i < gender_data.length; i++){
  gen_arr.push(gender_data[i]['mratio']);
  gen_arr.push(gender_data[i]['fratio']);
  gen_map.set(gender_data[i]['state'], gender_data[i]['male'] / gender_data[i]['female']);
  gen_map_val.push(gender_data[i]['male'] / gender_data[i]['female']);
}
let rmax = gen_arr.reduce(function(a, b) { //get max ratio
    return Math.max(a, b);
});
gen_map = Object.assign(gen_map, {title: "Male-to-Female Ratio"});
let gen_max = gen_map_val.reduce(function(a, b) { //get max population
    return Math.max(a, b);
});
let gen_min = gen_map_val.reduce(function(a, b) { //get min population
    return Math.min(a, b);
});

let schemePurples = ["#fcfbfd","#fcfbfd","#fbfafc","#fbfafc","#faf9fc","#faf9fc","#faf8fb","#f9f8fb","#f9f7fb","#f8f7fb","#f8f7fa","#f7f6fa","#f7f6fa","#f7f5fa","#f6f5f9","#f6f4f9","#f5f4f9","#f5f3f9","#f4f3f8","#f4f2f8","#f4f2f8","#f3f2f8","#f3f1f7","#f2f1f7","#f2f0f7","#f1f0f7","#f1eff6","#f0eff6","#f0eef6","#efeef5","#efedf5","#eeedf5","#eeecf5","#edecf4","#edebf4","#ecebf4","#ebeaf3","#ebe9f3","#eae9f3","#eae8f3","#e9e8f2","#e8e7f2","#e8e7f2","#e7e6f1","#e7e5f1","#e6e5f1","#e5e4f0","#e5e4f0","#e4e3f0","#e3e2ef","#e3e2ef","#e2e1ef","#e1e1ee","#e1e0ee","#e0dfee","#dfdfed","#dedeed","#dedded","#ddddec","#dcdcec","#dbdbec","#dbdaeb","#dadaeb","#d9d9ea","#d8d8ea","#d7d7ea","#d7d7e9","#d6d6e9","#d5d5e8","#d4d4e8","#d3d3e8","#d2d3e7","#d2d2e7","#d1d1e6","#d0d0e6","#cfcfe5","#cecee5","#cdcee5","#cccde4","#cbcce4","#cbcbe3","#cacae3","#c9c9e2","#c8c8e2","#c7c7e1","#c6c6e1","#c5c5e0","#c4c4e0","#c3c3df","#c2c3df","#c1c2de","#c0c1de","#bfc0dd","#bebfdd","#bebedc","#bdbddc","#bcbcdb","#bbbbda","#babada","#b9b9d9","#b8b8d9","#b7b7d8","#b6b5d8","#b5b4d7","#b4b3d6","#b3b2d6","#b2b1d5","#b1b0d5","#b0afd4","#afaed4","#aeadd3","#aeacd2","#adabd2","#acaad1","#aba9d1","#aaa8d0","#a9a7cf","#a8a6cf","#a7a5ce","#a6a4ce","#a5a3cd","#a4a2cd","#a3a1cc","#a2a0cb","#a19fcb","#a09eca","#9f9dca","#9e9cc9","#9e9ac9","#9d9ac8","#9c99c8","#9b98c7","#9a97c7","#9996c6","#9895c6","#9794c5","#9693c5","#9592c4","#9491c4","#9390c3","#928fc3","#918ec2","#908dc2","#908cc1","#8f8bc1","#8e8ac0","#8d89c0","#8c88bf","#8b87bf","#8a86be","#8985be","#8884bd","#8883bd","#8782bc","#8680bc","#857fbb","#847eba","#837dba","#827cb9","#827bb9","#817ab8","#8079b8","#7f77b7","#7e76b6","#7e75b6","#7d74b5","#7c73b4","#7b71b4","#7b70b3","#7a6fb3","#796eb2","#786cb1","#786bb1","#776ab0","#7668af","#7567af","#7566ae","#7465ad","#7363ad","#7362ac","#7261ab","#715fab","#705eaa","#705ca9","#6f5ba8","#6e5aa8","#6e58a7","#6d57a6","#6c56a6","#6c54a5","#6b53a4","#6a52a4","#6950a3","#694fa2","#684ea2","#674ca1","#674ba0","#664aa0","#65489f","#65479e","#64469e","#63449d","#63439c","#62429c","#61409b","#613f9a","#603e9a","#5f3c99","#5e3b99","#5e3a98","#5d3897","#5c3797","#5c3696","#5b3595","#5a3395","#5a3294","#593194","#582f93","#582e92","#572d92","#562b91","#562a91","#552990","#54288f","#54268f","#53258e","#52248e","#52238d","#51218c","#50208c","#501f8b","#4f1e8b","#4e1c8a","#4e1b8a","#4d1a89","#4c1988","#4c1788","#4b1687","#4a1587","#4a1486","#491286","#481185","#481084","#470f84","#460d83","#460c83","#450b82","#440a82","#440981","#430780","#420680","#42057f","#41047f","#40027e","#40017e","#3f007d"];

var render_gen_chart = function(){
  var space = document.getElementById('chart');
  space.innerHTML = "";

  var groupKey = 'abbrev';
  var keys = ['mratio', 'fratio'];
  var margin = ({top: 10, right: 10, bottom: 20, left: 40}),
      height = 500,
      width = 1000 + margin.right + margin.left;

  var x0 = d3.scaleBand()
    .domain(gender_data.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.1);

  var x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05);

  var y = d3.scaleLinear()
    .domain([0, rmax]).nice()
    .rangeRound([height - margin.bottom, margin.top]);

  var color = d3.scaleOrdinal()
    .range(["#bae1ff", "#ffd1dc"]);

  var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .call(g => g.select(".domain").remove());

  var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "%"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(gender_data.y));

  var legend = svg => {
    const g = svg
        .attr("transform", `translate(${width},0)`)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
      .data(color.domain().slice().reverse())
      .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    g.append("rect")
        .attr("x", -19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

    g.append("text")
        .attr("x", -24)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(d => d);
  };

  var svg = d3.select('#chart')
    .append('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append("g")
    .selectAll("g")
    .data(gender_data)
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);
};

//-----------------------------------------------------------
//rendering
var display_dropdown = document.getElementById('display');
var value_dropdown = document.getElementById('value');
var renderbtn = document.getElementById('renderbtn');
var color, colorScale;

var render = function(e){
  var display = display_dropdown.options[display_dropdown.selectedIndex].value;
  var value = value_dropdown.options[value_dropdown.selectedIndex].value;

  if (display == 0){ //map
    if (value == 0){ //population
      color = d3.scaleQuantize()
        .domain([min, max])
        .range(schemeBlues.slice(0, schemeBlues.length));
      colorScale = d3.scaleQuantize()
        .domain([min, max])
        .range(d3.schemeBlues[8]);
      render_map(state_data, color, colorScale, min, max, ".2s");
    }
    else if (value == 1){ //ethnicity
      //render_map
    }
    else { //gender ratio
      color = d3.scaleQuantize()
        .domain([gen_min, gen_max])
        .range(schemePurples.slice(0, schemePurples.length));
      colorScale = d3.scaleQuantize()
        .domain([gen_min, gen_max])
        .range(d3.schemePurples[8]);
      render_map(gen_map, color, colorScale, gen_min, gen_max, ",.1%");
    }
  }
  else {
    if (value == 0){ //population
      render_pop_chart();
    }
    else if (value == 1){ //ethnicity
      render_eth_chart();
    }
    else { //gender ratio
      render_gen_chart();
    }
  }
};

renderbtn.addEventListener('click', render);
