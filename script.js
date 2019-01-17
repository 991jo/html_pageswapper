/* the programm uses 2 iframes, one which is displayed on the full screen and
 * a second one which is hidden. While the active on is displayed the second one
 * loads the next page. When the display time is over the active and passive
 * iframes are swapped
 *
 * Some parts are deliberatly left synchronous to keep the program simple.
 */
active = document.getElementById("iframe1")
passive = document.getElementById("iframe2")
position = 0;
list = []

/* simple synchronous sleep function */
async function sleep(ms) {
	await new Promise(resolve => setTimeout(resolve, ms));
}

/* swaps the active and passive iframe */
function swap_iframe(){
	passive.style.display = "block"
	active.style.display = "none"
	let temp = passive;
	passive = active;
	active = temp;
}

/* loads the data.json file from the server and updates the list with it */
function load_list(callback){
	while(true){
		var json_file = new XMLHttpRequest();
		json_file.overrideMimeType("application/json")
		json_file.open("GET","data.json",false)
		json_file.send()

		if(json_file.status == 200) {
			try {
				list = JSON.parse(json_file.responseText)
				check_position();
				break;
			} catch (error){
				console.log(error)
				sleep(1000);
			}
		}
	}
}

function check_position(){
	if(position >= list.length){
		position = 0;
	}
}

/* loads the page in the passive iframe */
function build_iframe(){
	passive.src = list[position].uri;
}

/* initial setup, displays the first page, loads the second one in the passive iframe */
async function setup(){
	load_list();
	position = 0;
	build_iframe();
	swap_iframe();
	position++;
	check_position()
	build_iframe();
	setTimeout(update, list[position].displaytime)
	position++;
	check_position()
}


function update(){
	swap_iframe();
	load_list();
	build_iframe();
	setTimeout(update, list[position].displaytime)
	position++;
	check_position()
}

setup()
