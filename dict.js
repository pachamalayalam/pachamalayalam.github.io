// മുതല്‍ പേരുകള്‍
const input = document.getElementById("search");
const $submit = document.getElementById("submit-btn");
const $match = document.getElementById("match-list");
const $display = document.getElementById("display");
const instruction = document.querySelector("#instruction");

  //ജേസണ്‍ പിടിക്കുകയും ഉരികള്‍ അരിക്കുകയും ചെയ്യുക
  const $filter = async filterText => {
    const res = await fetch('https://malayalamozhi.github.io/mikuti/mal.json');
    const dict = await res.json();
   //find match to current input
   let matches = dict.filter(data => {
    const regex = new RegExp(`^${filterText}`, 'gi');
    return data.en.match(regex) || data.ml.match(regex) || data.other.match(regex) || data.san.match(regex)
  });
  
    // പിന്നോട്ടടി നില
    if(filterText.length <= 1) {
      matches = [];
      $match.style.display ="none";
      $display.innerHTML = "";
      $display.style.display = "none";
      window.localStorage.clear();
    };
  
  // അരിച്ചവ വെളിയില്‍ കാട്ടുക
   outputMatches(matches);
  
  };
  
  // അരിച്ചവ കാട്ടുന്ന വിന
 const outputMatches = matches => {

              //english
 if(matches.length > 0){  
 var text = input.value.replace(/\s/g);
     var langdic = {
      "english" : /^[a-zA-Z]+$/,
       "malayalam" : /[\u0D00-\u0D7F]/,
 };
 var keys = Object.entries(langdic); 
  Object.entries(langdic).forEach(([key, value]) => {
if (value.test(text) == true){
if(key === "english"){ //checks en
const html = matches.map(match => `<li class="filter-words"><span>${match.en}</span></li>
`).join('');
$match.innerHTML = html;
$match.style.display = "block";
}else {  //checks ml
const html = matches.map(match => `<li class="filter-words"><span>${match.ml} ${match.san}</span></li>
`).join('');
$match.innerHTML = html;
$match.style.display = "block";  
}
          
 }
 })                    
   }; 
 };
          

  

  
  //ആരാഞ്ഞവ കാണിക്കുന്ന വിന
  let url = 'https://malayalamozhi.github.io/mikuti/mal.json';
  function findWords(){
    fetch(url).then(res => res.json())
    .then(data => {
      data.filter(function(item){
        //add other and sanskrit entry 
        if(item.en == input.value){
          $display.style.display = "block";
          var searchItem = document.createElement('h3'); //searchitem 
          var partOfSpeech = document.createElement('p'); //type
          var container = document.createElement('div');
          var definition = document.createElement('p'); //definition eng or ml
          container.appendChild(definition);
          //related malayalam
         if(item.other.length != 0){
          var relatedWords = document.createElement('p');
          relatedWords.innerHTML = '<span>related</span> ' + item.other;
          container.appendChild(relatedWords);
        };
        //related english
        if(item.otheren.length != 0){
          var otheren = document.createElement('p');
          otheren.innerHTML ='<span>related english words</span> ' + item.otheren;
          container.appendChild(otheren);
        };
        //example
        if(item.example.length !=0){
          var example = document.createElement('p');
          example.innerHTML = '<span>example</span> ' + item.example;
          container.appendChild(example);
        };
           //malayalam explaination
           if(item.MalExplanation  !=0){
            var explanation = document.createElement('p');
            explanation.innerHTML = '<span> വിവരണം</span> ' + item.MalExplanation;
            container.appendChild(explanation);
          }
        //sanskritised malayalam
        if(item.san.length !=0){
          var san = document.createElement('p');
          san.innerHTML = '<span>sanskritised malayalam</span> ' +item.san;
          container.appendChild(san);
        };
          searchItem.innerHTML = item.en; // searchitem
 
          partOfSpeech.innerHTML = item.type; //part of speech
          definition.innerHTML = '<span>meaning</span> ' + item.ml; //definition
          
         //classes
          container.classList.add('pos');
          //appendChild
          $display.appendChild(searchItem);
          $display.appendChild(partOfSpeech);
          $display.appendChild(container);
         //prefix and suffix function           
          function prefixer(){
            if(item.type === 'prefix'){
              searchItem.innerHTML =  item.en +"-";
            }else if(item.type === 'suffix'){
              searchItem.innerHTML = "-"+item.en;
            };
          }
          prefixer();
          //enter prevent    
          
        } else if(item.ml == input.value){
          $display.style.display = "block";
          var searchItem = document.createElement('h3'); //searchitem
          var partOfSpeech = document.createElement('p'); //type
          var container = document.createElement('div');
          var definition = document.createElement('p'); //definition eng or ml
          container.appendChild(definition);
             //related malayalam
         if(item.other.length != 0){
          var relatedWords = document.createElement('p');
          relatedWords.innerHTML = '<span>ചാര്‍ച്ചയുള്ളവ</span> ' + item.other;
          container.appendChild(relatedWords);
        };
         //related english
         if(item.otheren.length != 0){
          var otheren = document.createElement('p');
          otheren.innerHTML ='<span>ഉറ്റ ഇംഗ്ലീഷ് വാക്കുകള്‍</span> ' + item.otheren;
          container.appendChild(otheren);
        };
         //example
         if(item.example.length !=0){
          var example = document.createElement('p');
          example.innerHTML = '<span>എടുത്തുകാട്ടല്‍</span> ' + item.example;
          container.appendChild(example);
        };
        //malayalam explaination
        if(item.MalExplanation  !=0){
          var explanation = document.createElement('p');
          explanation.innerHTML = '<span> വിവരണം</span> ' + item.MalExplanation;
          container.appendChild(explanation);
        }
         //sanskritised malayalam
         if(item.san.length !=0){
          var san = document.createElement('p');
          san.innerHTML = '<span>സംസ്കൃത മലയാളം</span> ' +item.san;
          container.appendChild(san);
        };
               //classes
          container.classList.add('pos');

          searchItem.innerHTML = item.ml; // searchitem
          partOfSpeech.innerHTML = item.type; //part of speech
          definition.innerHTML = '<span>പൊരുള്‍</span> ' + item.en; //definition
       
          $display.appendChild(searchItem);
          $display.appendChild(partOfSpeech);
          $display.appendChild(container);

          //prefix function

          function prefixer(){
            if(item.type === 'prefix'){
              searchItem.innerHTML =  item.ml +"-";
            }else if(item.type === 'suffix'){
              searchItem.innerHTML = "-"+item.ml;
            };
          }
          prefixer();

          //translate
          function translate_ml(){
            if(partOfSpeech.innerHTML === 'noun'){
              partOfSpeech.innerHTML = 'പേര്'
            } else if(partOfSpeech.innerHTML === 'verb'){
              partOfSpeech.innerHTML = 'വിന'
            } else if(partOfSpeech.innerHTML === 'adjective'){
              partOfSpeech.innerHTML = 'നാമവിശേഷണം'
            } //add adverb
          }
          translate_ml();
        } else if(item.san == input.value){
          $display.style.display = "block";
          var searchItem = document.createElement('h3'); //searchitem
          var partOfSpeech = document.createElement('p'); //type
          var container = document.createElement('div');
          var definition = document.createElement('p'); //definition eng or ml
          container.appendChild(definition);
             //related malayalam
         if(item.other.length != 0){
          var relatedWords = document.createElement('p');
          relatedWords.innerHTML = '<span>ചാര്‍ച്ചയുള്ളവ</span> ' + item.other;
          container.appendChild(relatedWords);
        };
         //related english
         if(item.otheren.length != 0){
          var otheren = document.createElement('p');
          otheren.innerHTML ='<span>ഉറ്റ ഇംഗ്ലീഷ് വാക്കുകള്‍</span> ' + item.otheren;
          container.appendChild(otheren);
        };
         //example
         if(item.example.length !=0){
          var example = document.createElement('p');
          example.innerHTML = '<span>എടുത്തുകാട്ടല്‍</span> ' + item.example;
          container.appendChild(example);
        };
        //malayalam explaination
        if(item.MalExplanation  !=0){
          var explanation = document.createElement('p');
          explanation.innerHTML = '<span> വിവരണം</span> ' + item.MalExplanation;
          container.appendChild(explanation);
        }
         //sanskritised malayalam
         if(item.san.length !=0){
          var san = document.createElement('p');
          san.innerHTML = '<span>സംസ്കൃത മലയാളം</span> ' +item.san;
          container.appendChild(san);
        };
               //classes
          container.classList.add('pos');

          searchItem.innerHTML = item.ml; // searchitem
          partOfSpeech.innerHTML = item.type; //part of speech
          definition.innerHTML = '<span>പൊരുള്‍</span> ' + item.en; //definition
       
          $display.appendChild(searchItem);
          $display.appendChild(partOfSpeech);
          $display.appendChild(container);

          //prefix function

          function prefixer(){
            if(item.type === 'prefix'){
              searchItem.innerHTML =  item.ml +"-";
            }else if(item.type === 'suffix'){
              searchItem.innerHTML = "-"+item.ml;
            };
          }
          prefixer();

          //translate
          function translate_ml(){
            if(partOfSpeech.innerHTML === 'noun'){
              partOfSpeech.innerHTML = 'പേര്'
            } else if(partOfSpeech.innerHTML === 'verb'){
              partOfSpeech.innerHTML = 'വിന'
            } else if(partOfSpeech.innerHTML === 'adjective'){
              partOfSpeech.innerHTML = 'നാമവിശേഷണം'
            } //add adverb
          }
          translate_ml();
        } else if(item.other == input.value){
          $display.style.display = "block";
          var searchItem = document.createElement('h3'); //searchitem
          var partOfSpeech = document.createElement('p'); //type
          var container = document.createElement('div');
          var definition = document.createElement('p'); //definition eng or ml
          container.appendChild(definition);
             //related malayalam
         if(item.other.length != 0){
          var relatedWords = document.createElement('p');
          relatedWords.innerHTML = '<span>ചാര്‍ച്ചയുള്ളവ</span> ' + item.other;
          container.appendChild(relatedWords);
        };
         //related english
         if(item.otheren.length != 0){
          var otheren = document.createElement('p');
          otheren.innerHTML ='<span>ഉറ്റ ഇംഗ്ലീഷ് വാക്കുകള്‍</span> ' + item.otheren;
          container.appendChild(otheren);
        };
         //example
         if(item.example.length !=0){
          var example = document.createElement('p');
          example.innerHTML = '<span>എടുത്തുകാട്ടല്‍</span> ' + item.example;
          container.appendChild(example);
        };
        //malayalam explaination
        if(item.MalExplanation  !=0){
          var explanation = document.createElement('p');
          explanation.innerHTML = '<span> വിവരണം</span> ' + item.MalExplanation;
          container.appendChild(explanation);
        }
         //sanskritised malayalam
         if(item.san.length !=0){
          var san = document.createElement('p');
          san.innerHTML = '<span>സംസ്കൃത മലയാളം</span> ' +item.san;
          container.appendChild(san);
        };
               //classes
          container.classList.add('pos');

          searchItem.innerHTML = item.ml; // searchitem
          partOfSpeech.innerHTML = item.type; //part of speech
          definition.innerHTML = '<span>പൊരുള്‍</span> ' + item.en; //definition
       
          $display.appendChild(searchItem);
          $display.appendChild(partOfSpeech);
          $display.appendChild(container);

          //prefix function

          function prefixer(){
            if(item.type === 'prefix'){
              searchItem.innerHTML =  item.ml +"-";
            }else if(item.type === 'suffix'){
              searchItem.innerHTML = "-"+item.ml;
            };
          }
          prefixer();

          //translate
          function translate_ml(){
            if(partOfSpeech.innerHTML === 'noun'){
              partOfSpeech.innerHTML = 'പേര്'
            } else if(partOfSpeech.innerHTML === 'verb'){
              partOfSpeech.innerHTML = 'വിന'
            } else if(partOfSpeech.innerHTML === 'adjective'){
              partOfSpeech.innerHTML = 'നാമവിശേഷണം'
            } //add adverb
          }
          translate_ml();
        };  // try appending
      }
      );
      matches = [];
      $match.style.display ="none";
      input.value = "";
  
      
    });
  }
// ചില്ലുകള്‍ തിരിക്കല്‍
 
function chillu(){
  let i = input.value;
  let NChillu = i.includes("ണ്‍");
  let nChillu = i.includes("ന്‍");
  let rChillu = i.includes("ര്‍");
  let lChillu = i.includes("ല്‍");
  let LChillu = i.includes("ള്‍");
  let kChillu = i.includes("ക്‍");

  if(NChillu === true){ // ണ്‍ തേടുന്നു
    let root = i.split("ണ്‍").join("ണ്"); 
    input.value = root;
  }else if(kChillu === true){
    let root = i.split("ക്‍").join("ക്"); 
    input.value = root;
  }
}

  
  // ഉള്ളിലേക്കുള്ള വിനകള്‍

  input.addEventListener('input', () => $filter(input.value));
  $submit.addEventListener('click', () => findWords());
  input.addEventListener('input', () => chillu());
  input.addEventListener('input', function(){
    instruction.innerHTML = "";
    instruction.style.display = "none";
  });


//enter a word
  function enterKey(event){
    if(event.keyCode === 13){
      findWords();
      if(input.value.length === 0){
        input.value = "Enter a Word! വാക്ക് തിരയുക";
        instruction.style.display = "block";
        instruction.innerHTML = "Enter a word! വാക്ക് തിരയുക";
      };
    };
  };

$submit.addEventListener('click', function(){
  if(input.value.length === 0){
    input.value = "Enter a word! വാക്ക് തിരയുക";
    instruction.style.display = "block";
    instruction.innerHTML = "Enter a word! വാക്ക് തിരയുക";
  }
});

//instruction display


   //other stuff  
   // മലയാളത്തിനായി ചില്ലു തിരിച്ചറിയല്‍ ചട്ടം നിലയിടുക. progressing

//translation for malayalam partofspeech
//latin-ml input
// add copy to clipboard on doubleclick
//add origin & pronunciation
// add search in malayalam and others function
// word not in dictionary

