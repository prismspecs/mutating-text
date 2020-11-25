var words = ["mutational", "text", "modern", "science", "blind", "in", "the", "first", "place", "focus", "beyond", "logical", "systems", "logical", "crisis", "going", "viral", "a", "vice", "a", "critical", "potential", "rethink", "concept", "of", "life"];

var MutationActive = false;

var wordSearchIndex = words.length - 1;

function PrepText(divClass, wordList) {

	// specify a class within which to search for words
	var e = document.getElementsByClassName(divClass);

	// wrap every single word in a "blackout" span class
	for (i = 0; i < e.length; i++) {
		e[i].innerHTML = e[i].innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="blackout">$2</span>');
	}

	// remove and apply special class for specified words
	var spans = document.getElementsByClassName("blackout");
	// better to move backward thru array bc i'll be removing classes
	for (var i = spans.length - 1; i >= 0; i--) {
		//console.log("looking for " + words[wordSearchIndex] + " in " + spans[i].innerHTML);
		var n = spans[i].innerHTML.search(words[wordSearchIndex]);

		// if we found a match
		if (n > -1 && wordSearchIndex >= 0) {

			//console.log("found match for " + words[wordSearchIndex]);

			// add mutated class
			var output = spans[i].innerHTML;

			// quick hack to add colon after 'mutational text:'
			if (words[wordSearchIndex] == "text") {
				var replaced = "<span class='mutated addcolon'>" + words[wordSearchIndex] + "</span>";
			} else {
				var replaced = "<span class='mutated'>" + words[wordSearchIndex] + "</span>";
			}

			output = output.replace(words[wordSearchIndex], replaced);

			spans[i].innerHTML = output;

			// remove blackout class
			// spans[i].classList.remove("blackout");
			//console.log(spans[i].classList);

			wordSearchIndex--;
		}
	};
}

function FlipText() {
	MutationActive = !MutationActive;

	if (MutationActive)
		ActivateText();
	else
		DeactivateText();

}

function ActivateText() {
	var blackouts = document.getElementsByClassName("blackout");
	for (var i = 0; i < blackouts.length; i++) {
		blackouts[i].classList.add("blackout-active");
	}

	var mutations = document.getElementsByClassName("mutated");
	for (var i = 0; i < mutations.length; i++) {
		mutations[i].classList.add("mutated-active");
	}
}

function DeactivateText() {
	var blackouts = document.getElementsByClassName("blackout");
	for (var i = 0; i < blackouts.length; i++) {
		blackouts[i].classList.remove("blackout-active");
	}

	var mutations = document.getElementsByClassName("mutated");
	for (var i = 0; i < mutations.length; i++) {
		mutations[i].classList.remove("mutated-active");
	}
}


// add event listeners
// so that when you click on content divs it switches effect on/off
var elems = document.getElementsByClassName("content");
for (var i = 0; i < elems.length; i++) {
	elems[i].addEventListener("click", FlipText);

}


PrepText("content", words);
// ActivateText();
// AddLink();


var styles = `
.blackout {
  background-color: rgba(255,255,255,1);
  transition: 3s;
}
a .blackout {
  background-color: transparent;
}
.blackout-active {
 background-color: rgba(0,0,0,.5);
 color: rgba(0,0,0,0);
 transition: 3s;
}
.mutated {
 background-color: rgba(255,255,255,1);
 color: rgba(0,0,0,1);
 transition: 3s;
}
.mutated-active {
 margin: 8px;
 padding: 2px;
 transition: 3s;
 color: rgba(0,0,0,1);
}
.mutated-active.addcolon:after {
 content: ":";
}
`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);