import Canvas from "./Canvas";
import data from "../characters.json";
import drawBackground from "../js/drawBackground";
import drawSprites from "../js/drawSprites";
import drawNameTag from "../js/drawNameTag";
import drawText from "../js/drawText";
import { useMemo } from "react";

const Content = ({
    tabState,
    hideState,
    setTabState,
    setHideState,
    background,
    sprites,
    nameTag,
    text,
}) => {
    const save = () => {
        const canvas = document.getElementsByTagName("canvas")[0];
        var image = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        var link = document.createElement("a");
        link.href = image;
        link.download = "dialogue.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const drawCanvas = async (ctx) => {
        ctx.canvas.width = 1820;
        ctx.canvas.height = 1024;

        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        await drawBackground(ctx, background);

        const drawSpritePromises = Object.keys(sprites).map((key) =>
            drawSprites(ctx, sprites[key], data[sprites[key].character])
        );

        await Promise.all(drawSpritePromises);

        await drawText(ctx, text);
        await drawNameTag(ctx, nameTag);
    };
    return (
        <div id="content" className="center relative">
            <div
                className={
                    hideState ? "hide" : "absolute top-right button-icons"
                }
            >
                <button
                    className={
                        tabState === "background"
                            ? "icon btn-orange bottom-20"
                            : "icon btn-white bottom-20"
                    }
                    onClick={() => setTabState("background")}
                >
                    <i className="bi bi-card-image icon-btn"></i>
                </button>
                <button
                    className={
                        tabState === "text"
                            ? "icon btn-orange bottom-20"
                            : "icon btn-white bottom-20"
                    }
                    onClick={() => setTabState("text")}
                >
                    <i className="bi bi-chat icon-btn"></i>
                </button>
                <button
                    className={
                        tabState === "sprite"
                            ? "icon btn-orange bottom-20"
                            : "icon btn-white bottom-20"
                    }
                    onClick={() => setTabState("sprite")}
                >
                    <i className="bi bi-person-fill icon-btn"></i>
                </button>
            </div>
            <div className="absolute bottom-right button-icons">
                <button
                    className="icon btn-white"
                    onClick={() => setHideState(!hideState)}
                >
                    {hideState ? (
                        <i className="bi bi-chevron-left icon-btn"></i>
                    ) : (
                        <i className="bi bi-chevron-right icon-btn"></i>
                    )}
                </button>
            </div>
            <div className="absolute bottom-left button-icons">
                <button
                    className="btn-small btn-green btn-192 bottom-20"
                    onClick={() => {
                        save();
                    }}
                >
                    Save
                </button>
                <button
                    className="btn-small btn-white btn-192"
                    onClick={() => {
                        drawCanvas(
                            document
                                .getElementById("main-canvas")
                                .getContext("2d")
                        );
                    }}
                >
                    Rerender
                </button>
            </div>
            <Canvas draw={drawCanvas}></Canvas>
        </div>
    );
};

export default Content;
