function start() {
    var container = document.createElement("div");
    container.setAttribute("class", "container");

    var heading = document.createElement("h1");
    heading.setAttribute("id", "heading");
    heading.innerHTML = "Type Your Code!";
    container.appendChild(heading);

    var language = document.createElement("select");
    language.setAttribute("id", "language");

    var option1 = document.createElement("option");
    option1.innerHTML = "Python";
    option1.value = "0";

    var option2 = document.createElement("option");
    option2.innerHTML = "Javascript";
    option2.value = "4";

    var option3 = document.createElement("option");
    option3.innerHTML = "C";
    option3.value = "7";

    var option4 = document.createElement("option");
    option4.innerHTML = "CPP";
    option4.value = "77";

    var option5 = document.createElement("option");
    option5.innerHTML = "Java";
    option5.value = "8";

    language.appendChild(option1);
    language.appendChild(option2);
    language.appendChild(option3);
    language.appendChild(option4);
    language.appendChild(option5);
    container.appendChild(language);

    var textarea = document.createElement("textarea");
    textarea.placeholder = "Write Your Code Here!";
    textarea.setAttribute("id", "textarea");
    container.appendChild(textarea);

    var output = document.createElement("textarea");
    output.setAttribute("id", "output");
    output.placeholder = "Your Output!"


    var compile = document.createElement("button");
    compile.setAttribute("id", "compile");
    compile.innerHTML = "Compile";
    container.appendChild(compile);
    container.appendChild(output);

    document.body.appendChild(container);


    compile.addEventListener("click", compilecode)

    function compilecode() {
        var textarea = document.getElementById("textarea");
        var language = document.getElementById("language");
        var output = document.getElementById("output");

        //API 
        var request = new XMLHttpRequest();
        request.open("POST", "https://codequotient.com/api/executeCode")
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({ code: textarea.value, langId: language.value }))

        request.addEventListener("load", function(event) {
            var response = JSON.parse(event.target.responseText);

            setTimeout(function() {
                getmaincode(response.codeId)
            }, 5000);

        })

        function getmaincode(codeId) {


            var request = new XMLHttpRequest();
            request.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);
            request.send();
            //console.log(request);
            request.addEventListener("load", function(event) {
                var maindata = JSON.parse(event.target.responseText);
                var data = JSON.parse(maindata.data);
                //console.log(data);
                var output = document.getElementById("output")
                if (data.output !== '') {
                    output.innerHTML = data.output;
                } else {
                    output.innerHTML = data.errors;
                }

            })

        }
    }
}
start();