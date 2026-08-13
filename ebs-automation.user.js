// ==UserScript==
// @name         EBS - Preenchimento Automático
// @namespace    ebs-automatico
// @version      4.0
// @description  Preenche os dados e envia automaticamente
// @match        https://mijnaccount.nvebs.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function preencherEEnviar() {

        const url = new URL(window.location.href);

        const klantnummer = url.searchParams.get("klant");
        const aansluitnummer = url.searchParams.get("aansluit");

        if (!klantnummer || !aansluitnummer) {
            return;
        }

        const campos = document.querySelectorAll("input");

        let klant = null;
        let aansluit = null;

        campos.forEach((campo) => {

            const nome = (
                campo.name + " " +
                campo.id + " " +
                campo.placeholder
            ).toLowerCase();

            if (nome.includes("klant")) {
                klant = campo;
            }

            if (nome.includes("aansluit")) {
                aansluit = campo;
            }
        });

        // Preenche Klantnummer
        if (klant) {
            klant.value = klantnummer;
            klant.dispatchEvent(new Event("input", { bubbles: true }));
            klant.dispatchEvent(new Event("change", { bubbles: true }));
        }

        // Preenche Aansluitnummer
        if (aansluit) {
            aansluit.value = aansluitnummer;
            aansluit.dispatchEvent(new Event("input", { bubbles: true }));
            aansluit.dispatchEvent(new Event("change", { bubbles: true }));
        }

        // Aguarda o site processar os campos
        setTimeout(() => {

            // Procura todos os elementos clicáveis
            const elementos = document.querySelectorAll(
                'button, input, a'
            );

            for (const elemento of elementos) {

                const texto = (
                    elemento.innerText ||
                    elemento.value ||
                    elemento.textContent ||
                    ""
                ).trim().toLowerCase();

                if (texto === "submit") {

                    console.log("EBS Auto: botão Submit encontrado!");
                    console.log(elemento);

                    elemento.click();

                    return;
                }
            }

            console.log("EBS Auto: botão Submit não encontrado.");

        }, 2000);
    }

    window.addEventListener("load", () => {
        setTimeout(preencherEEnviar, 1000);
    });

})();