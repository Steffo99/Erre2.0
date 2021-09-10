import React, {useEffect, useState} from "react";
import Style from "../Panel.module.css";
import {Anchor, Box, Button, Chapter, Field, Footer, Form, Heading, LayoutFill, Panel, Table} from "@steffo/bluelib-react";
import {useAppContext} from "../../../../libs/Context";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";


export default function ProfilePanel(props) {
    const {instanceIp, setInstanceIp} = useAppContext()
    const {connected, setConnected} = useAppContext()
    const {token, setToken} = useAppContext()

    const [name, setName] = useState(props.user.name)
    const [surname, setSurname] = useState(props.user.surname)
    const [email, setEmail] = useState(props.user.email)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    async function saveElement(){
        const response = await fetch("http://" + instanceIp + "/users/"+props.user.uid, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
        });
        if (response.status === 200) {
            props.setReload(!props.reload)
        }
    }

    return (
        <div>

            <Box>

                <Form>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setName(e)} value={name} required={true}
                                    placeholder={"Nome"} validity={name != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setSurname(e)} value={surname} required={true}
                                    placeholder={"Cognome"} validity={surname != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setEmail(e)} value={email} required={true}
                                    placeholder={"Email"} validity={email != ""}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setPassword(e)} value={password} required={true}
                                    placeholder={"Password"} validity={password!=""} type={"password"}>
                        </Form.Field>
                    </Form.Row>
                    <Form.Row>
                        <Form.Field onSimpleChange={e => setPassword2(e)} value={password2} required={true}
                                    placeholder={"Password"} validity={password2==password && password2!=""} type={"password"}>
                        </Form.Field>
                    </Form.Row>
                </Form>
                <Button customColor={"green"} onClick={e => saveElement()} disabled=
                    {password2!=password || password=="" || email == "" || name == "" || surname == ""}>
                    <FontAwesomeIcon icon={faSave}/></Button>
            </Box>
        </div>
    );
}