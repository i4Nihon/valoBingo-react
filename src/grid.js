import './App.css';
import {useState} from 'react';

require("dotenv").config();
const ComfyJS = require("comfy.js");

const regex = /^[1-4]\.[1-4]$/;

const makeItOn = new CustomEvent('makeItOn');
const makeItOff = new CustomEvent('makeItOff');
const touchChange = new CustomEvent('touchChange')

function Field({contentF, isActive}) {

  return (
    <>
      <div className={isActive ? 'field active' : "field inactive"}>{contentF}</div>
    </>
  )
}


function Row({rowId, contentR}) {

  const [isActive, setIsActive] = useState({
    1: true,
    2: true,
    3: true,
    4: true
  });

  document.addEventListener('makeItOn', (e) => {
    setIsActive(e, true)
  })
  document.addEventListener('makeItOff', (e) => {
    setIsActive(false)
  })


  let split = contentR.split(" ");
  if (split.length < 4) {
    split = split.fill('0', split.length - 1, 4)
  }

  return (
    <div className={"row"}>
      <Field contentF={split[0]} fieldId={1} isActive={isActive}></Field>
      <Field contentF={split[1]} fieldId={2} isActive={isActive}></Field>
      <Field contentF={split[2]} fieldId={3} isActive={isActive}></Field>
      <Field contentF={split[3]} fieldId={4} isActive={isActive}></Field>
    </div>
  );
}


export default function Grid() {

  return (
    <div>
      <Row rowId={1} contentR={"a1 b1 c1 d1"}></Row>
      <Row rowId={2} contentR={"a2 b2 c2 d2"}></Row>
      <Row rowId={3} contentR={"a3 b3 c3 d3"}></Row>
      <Row rowId={4} contentR={"a4 b4 c4 d4"}></Row>
    </div>
  )
}

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if ((flags.broadcaster || flags.mod || flags.vip) && command.toLowerCase() === "bingo" && (extra.sinceLastCommand.any > 1000 || extra.sinceLastCommand.any === 0)) {
    const split = message.split(" ")
    switch (split[0]) {
      case "stan":
        if (regex.test(split[1])) {
          touchChange.detail = split[1]
          document.dispatchEvent(touchChange)
        } else {
          ComfyJS.Say("poprawny format id okienka to 'x.y' obie wartości muszą być cyfrą od 1 do 4", extra.channel)
        }
        break;
      case "refresh":

        break;
      case "odswiez":

        break;
      default:
        ComfyJS.Say("Użycie to: !bingo [stan|refresh|odswiez] [on|off]", extra.channel)
        break;
    }

  }
}

