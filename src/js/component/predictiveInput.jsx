import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/predictive.css"

const PredictiveInput = (props) => {
    const { store, actions } = useContext(Context)

    
    const caseCheck = (word) => {
        //let word = words.map((item, index) => { return item.name }) //only take names of products
        //Array of characters
        word = word.split("");
        let input = document.querySelector("#input")
        let inp = input.value;
        //loop through every character in ino
        for (let i in inp) {
            //if input character matches with character in word no need to change
            if (inp[i] == word[i]) {
                continue;
            } else if (inp[i].toUpperCase() == word[i]) {
                //if inp[i] when converted to uppercase matches word[i] it means word[i] needs to be lowercase
                word.splice(i, 1, word[i].toLowerCase());
            } else {
                //word[i] needs to be uppercase
                word.splice(i, 1, word[i].toUpperCase());
            }
        }
        //array to string
        return word.join("");
    };

    return (<>
        <div class="input-container">
            <input
                type="text"
                id="input"
                placeholder={`${props.placeholder}`}
                autocomplete="off"
                onChange={(e) => {
                    //Convert input value to regex since string.startsWith() is case sensitive
                    let regex = new RegExp("^" + input.value, "i");
                    //loop through words array
                    let words = props.list.map((item, index) => { return item.name })
                    words.sort()
                    for (let i in words) {
                        //check if input matches with any word in words array
                        if (regex.test(words[i]) && input.value != "") {
                            //Change case of word in words array according to user input
                            words[i] = caseCheck(words[i]);
                            //display suggestion
                            suggestion.innerHTML = words[i];
                            if(props.filter && props.dataCopy){
                                props.filter(e.target.value,"name")
                            }
                            break;
                        }
                    }
                }}
                onKeyDown={(e) => {
                    //When user presses enter and suggestion exists
                    let suggestion = document.querySelector("#suggestion");
                    let input = document.querySelector("#input");
                    if (e.keyCode == "46" && input.value.length == 1) {
                        e.preventDefault();
                        suggestion.innerHTML = "";
                        input.value = ""
                    }
                    if (e.keyCode == "8" && input.value.length == 1) {
                        e.preventDefault();
                        suggestion.innerHTML = "";
                        input.value = ""
                    }
                    if (e.keyCode == "13" && suggestion.innerText != "") {
                        e.preventDefault();

                        input.value = suggestion.innerText.toUpperCase();
                        props.setData({...props.data, item:input.value})
                        if(props.filter && props.dataCopy){
                            props.filter(input.value,"name")
                        }
                        //clear the suggestion                                      
                        suggestion.innerHTML = "";
                    }
                    if (e.keyCode == "13" && suggestion.innerText == "") {
                        e.preventDefault();
                        props.setData({...props.data, item:input.value})
                        //clear the suggestion                                      
                        suggestion.innerHTML = "";
                    }
                }}
            />
            <span id="suggestion"></span>
        </div>
    </>)
}

export default PredictiveInput;