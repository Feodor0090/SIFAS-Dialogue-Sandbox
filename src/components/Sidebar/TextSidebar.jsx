import { useState } from "react";
import data from "../../characters.json";
import loadImage from "../../js/loadImage";

const TextSidebar = ({
    text,
    setText,
    nameTag,
    setNameTag,
    experimental,
    setExperimental,
}) => {
    const [fart, setFart] = useState(false);
    return (
        <div id="text-sidebar">
            <div className="group">
                <h1 className="white">Text</h1>
                <textarea
                    className="btn-small btn-white w-100 setting"
                    onChange={(e) => {
                        let textToChange = e.target.value;
                        console.log(typeof textToChange);
                        if (/fart/gim.test(textToChange) && !fart) {
                            window.open("https://redd.it/nbr4ni");
                            alert("...why?");
                            setFart(true)
                            textToChange = "STOP POSTING ABOUT ELI FART! I'M TIRED OF SEEING IT! \nMY FRIENDS ON TIKTOK SEND ME MEMES, ON DISCORD \nIT'S FUCKING MEMES! I was in a server, right? and ALL OF THE \nCHANNELS were just eli fart stuff. AAAAAAAAAAAAAAHGESFG"
                        }
                        setText(textToChange);
                    }}
                    value={text}
                >
                    Edit Text
                </textarea>
            </div>
            <div className="group">
                <h1 className="white">Name Tag</h1>
                <input
                    type="text"
                    className="txt-small txt-white setting w-100"
                    placeholder="Name"
                    value={nameTag.name}
                    onInput={(e) => {
                        setNameTag({
                            ...nameTag,
                            name: e.target.value,
                        });
                    }}
                />
                <div className="setting row center">
                    <div className="column right-20">
                        <input
                            type="color"
                            name="primary"
                            id="primary"
                            className="color-select"
                            value={nameTag.primary}
                            onChange={(e) => {
                                setNameTag({
                                    ...nameTag,
                                    primary: e.target.value,
                                });
                                document.getElementById("default-color").value =
                                    "custom";
                            }}
                        />
                        <input
                            type="color"
                            name="secondary"
                            id="secondary"
                            className="color-select"
                            value={nameTag.secondary}
                            onChange={(e) => {
                                setNameTag({
                                    ...nameTag,
                                    secondary: e.target.value,
                                });
                                document.getElementById("default-color").value =
                                    "custom";
                            }}
                        />
                    </div>
                    <select
                        id="default-color"
                        className="sel-small w-100"
                        onChange={(e) => {
                            let value = e.target.value;
                            switch (value) {
                                case "muse":
                                    setNameTag({
                                        ...nameTag,
                                        primary: "#ff79cd",
                                        secondary: "#ffcdec",
                                    });
                                    break;
                                case "aqours":
                                    setNameTag({
                                        ...nameTag,
                                        primary: "#7bc8ff",
                                        secondary: "#cdeaff",
                                    });
                                    break;
                                case "niji":
                                    setNameTag({
                                        ...nameTag,
                                        primary: "#ffed45",
                                        secondary: "#fff8b7",
                                    });
                                    break;
                                case "you":
                                    setNameTag({
                                        ...nameTag,
                                        primary: "#c6cee5",
                                        secondary: "#ebebf3",
                                    });
                                    break;
                                case "others":
                                    setNameTag({
                                        ...nameTag,
                                        primary: "#bcecab",
                                        secondary: "#e5f8df",
                                    });
                                    break;
                            }
                        }}
                    >
                        <option value="muse">μ&apos;s</option>
                        <option value="aqours">Aqours</option>
                        <option value="niji">Nijigasaki</option>
                        <option value="you">You</option>
                        <option value="others">Others</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="setting row center">
                    <div className="column right-20">
                        <img
                            src={nameTag.icon ? nameTag.icon.src : ""}
                            id="char-icon-img"
                        />
                    </div>
                    <select
                        className="sel-small w-100"
                        value={nameTag.iconValue}
                        id="char-icon"
                        onChange={async (e) => {
                            const newValue = e.target.value;
                            if (newValue == "default") {
                                setNameTag({
                                    ...nameTag,
                                    iconValue: newValue,
                                    icon: null,
                                });
                                return;
                            }
                            const image = await loadImage(
                                `img/char_icon/${newValue}.png`
                            );
                            setNameTag({
                                ...nameTag,
                                iconValue: newValue,
                                icon: image,
                            });
                        }}
                    >
                        <option key="default" value="default">
                            --Default--
                        </option>
                        {Object.keys(data)
                            .sort((a, b) => a.localeCompare(b))
                            .map((c) => {
                                return (
                                    c != "rina_board" && (
                                        <option key={c} value={c}>
                                            {data[c].information.first}
                                        </option>
                                    )
                                );
                            })}
                    </select>
                </div>
                <div className="checkbox-form setting center">
                    <input
                        type="checkbox"
                        name="name-tag-hide"
                        id="name-tag-hide"
                        className="right-10"
                        onInput={(e) => {
                            setNameTag({
                                ...nameTag,
                                hidden: e.target.checked,
                            });
                        }}
                    />
                    <label
                        htmlFor="name-tag-hide"
                        className="label-checkbox white  w-100"
                    >
                        Hidden
                    </label>
                </div>
            </div>
            <div className="group">
                <h1 className="white">Experimental</h1>
                <div className="column setting">
                    <label
                        htmlFor="Text-Y-Offset"
                        className="label-slider white bottom-10 align-center"
                    >
                        Text Y-Offset ({experimental.textOffset}px){" "}
                        <i
                            className="bi bi-question-circle-fill text-setting-icon left-10"
                            onClick={() => {
                                alert(
                                    "If text positions do not line up in the canvas, adjustments may be necessary."
                                );
                            }}
                        ></i>
                    </label>
                    <input
                        type="range"
                        name="Text-Y-Offset"
                        id="text-y-offset"
                        className="white w-100"
                        value={experimental.textOffset}
                        min="-30"
                        max="30"
                        onChange={(e) => {
                            setExperimental({
                                ...experimental,
                                textOffset: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TextSidebar;
