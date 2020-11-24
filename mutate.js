// var word = 'mutat';
// var template = '$1<span class="blackout">$2</span>$3';
// var pattern = new RegExp('(>[^<.]*)(' + word + ')([^<.]*)', "ig");
// var content = $('.content').html();
// $('.content').html(content.replace(pattern, template));

var words = ["mutational", "text", "modern", "science", "blind", "in", "the", "first", "place", "focus", "beyond", "logical", "systems", "logical", "crisis", "going", "viral", "a", "vice",
	"a", "critical", "potential", "rethink", "concept", "of", "life"
];

var wordSearchIndex = 0;

function MutateText(divClass, wordList) {

	// specify a class within which to search for words
	var e = document.getElementsByClassName(divClass);

	// wrap every single word in a "blackout" span class
	for (i = 0; i < e.length; i++) {
		e[i].innerHTML = e[i].innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="blackout">$2</span>');
	}

	// remove and apply special class for specified words
	var spans = document.getElementsByClassName("blackout");
	for (var i = 0; i < spans.length; i++) {
		console.log("looking for " + words[wordSearchIndex] + " in " + spans[i].innerHTML);
		var n = spans[i].innerHTML.search(words[wordSearchIndex]);

		// if we found a match
		if (n > -1) {

			console.log("found match for " + words[wordSearchIndex]);

			var output = spans[i].innerHTML;
			var replaced = "<span class='mutated'>" + words[wordSearchIndex] + "</span>";

			output = output.replace(words[wordSearchIndex], replaced);

			//var output = spans[i].innerHTML.substring(0, n) + "test" + spans[i].innerHTML.substring(n);

			spans[i].innerHTML = output;
			wordSearchIndex++;
		}


		// if (new RegExp(words.join("|")).test(spans[i].innerHTML)) {
		// 	spans[i].classList.add("mutated");
		// 	spans[i].classList.remove("blackout");
		// 	// spans[i].innerHTML = "UPDATED!";
		// }

	};
}


// check mouse location
let isMouseHover = false;
let images = document.getElementsByClassName("image");

for (i = 0; i < images.length; i++) {
	images[i].addEventListener("mouseleave", function(event) {
		isMouseHover = false;


	}, false);
	images[i].addEventListener("mouseover", function(event) {
		isMouseHover = true;
		MutateText("content", words);

	}, false);
}




// MutateText("content", words);

var styles = `
@keyframes example {
   from {background-color: inherit;}
   to {background-color: black;}
 }
.blackout {
  background-color:#000;
  animation-name: example;
  animation-duration: 4s;
}
.mutated {
  background-color:white;
}
`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);