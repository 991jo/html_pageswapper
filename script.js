active = document.getElementById("iframe1")
passive = document.getElementById("iframe2")
position = 0;
list = []

async function sleep(ms) {
	await new Promise(resolve => setTimeout(resolve, ms));
}


function swap_iframe(){
	passive.style.display = "block"
	active.style.display = "none"
	let temp = passive;
	passive = active;
	active = temp;
}

function load_list(callback){
	while(true){
		var json_file = new XMLHttpRequest();
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

function build_iframe(){
	passive.src = list[position].uri;
}

async function setup(){
	load_list();
	position = 0;
	build_iframe();
	swap_iframe();
	setTimeout(update, list[position].displaytime)
	position++;
	position = position % list.length;
}


function update(){
	swap_iframe();
	load_list();
	build_iframe();
	setTimeout(update, list[position].displaytime)
	position++;
	position = position % list.length
}

setup()
