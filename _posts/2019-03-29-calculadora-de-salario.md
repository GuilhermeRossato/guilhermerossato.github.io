---
title: Desenvolvimento de ferramenta para calcular salário
layout: post
author: Guilherme Rossato
tags: ['HTML5', 'CSS3', 'Javascript']
language: pt-br
---

[Clique aqui se você só deseja ver o app desenvolvido](/projects/calculadora-de-salario/)

# Motivação

Não sei se você sofre disso, mas eu venho notando que as coisas ficam mais complicatadas para tirar nossa visão sobre elas.

Por exemplo, considere as duas proposta de emprego arbitrárias:

1. 3000 reais por mes com 30 dias de férias remuneradas por ano e décimo terceiro.

2. 4000 reais por mes sem férias remuneradas mas com afastamento de 30 dias por ano e também sem décimo terceiro.

Eai, destas duas opções acima, qual a melhor? Não ficou tão claro né? Será que 30 dias de férias vale a diferença de 500 reais mensais e o décimo terceiro?

Obviamente a diferença é: quanto vale os 30 dias de férias? E isso é possível calcular:

1. Para saber quanto vale 30 dias de férias, precisamos primeiro saber quanto vale 1 mes de trabalho pois são equivalentes.

3. Para saber quanto vale 1 mes de trabalho, precisamos saber quanto se ganha por ano (já que temos adicional de décimo terceiro)

4. O salário anual é de `3.000 * 12 + 3.900 = 39.000`. Beleza, o salário cru do ano é de R$ 39.000

5. O mes de trabalho vale `39.000 / 12 = 3.250`.

6. Então 1 mes de férias vale R$ 3.250 por ano.

7. Então o salário por ano da primeira opção é de R$ 39.000 + R$ 3.250 = R$ 42.250

8. O salário por ano da segunda opção é bem fácil: R$ 4.000 * 12 = R$ 48.000

9. Conclusão: É melhor você escolher a segunda opção.

Mas veja bem: Ninguem (em lugar algum) vai fazer estas conversões por você pois elas não sabem o que você valoriza.

Este é um caso simples e específico, mas na vida real existem outras coisas atrelados ao calculo de salário.

Você pode ter custos com contador (PJ), imposto e INSS (CLP). Também pode ter benefícios diários por dias trabalhados como vale alimentação e outras coisas que podem surgir.

Em um mundo ideal você pode colocar isso tudo num excel e 'transformar' estas coisas em valores normalizados e então poderá comparar propostas de forma efetiva, mas até o Excel é meio engessado para uma situação tão dinâmica.

Eu, por exemplo, gosto do valor hora. Para mim tudo que importa é quanto uma hora da minha vida vale em reais na hora de aceitar uma proposta.

É uma medida interessante: facilita a comparação e é muito intuitivo. Ainda sim, toda proposta que recebo tem que ser normalizada e, como propostas mudam com frequencia, tenho que fazer isso diversas vezes.

Motivado por estes cálculos constantes, criei a seguinte aplicação mobile: A Calculadora de Salário.

É bem simples: você coloca quantas horas você vai trabalhar na medida que tiver, qual seu salário prometido, quanto você recebe de extras (décimo terceiros ou auxilio refeição, por exemplo), quanto você gasta (com contador, advogado, equipamentos) e ele te mostra o seu salário anual, mensal, diário e por hora.

Basicamente, ele trata toda as conversões ano-mes-dia-hora para você automaticamente e te ajuda a comparar possíveis propostas.

# Como usar a ferramenta

Todos os dados que você coloca são salvos no seu navegador localmente, então se abrir no seu celular os dados vão ficar só ali, localmente. Estou usando o LocalStorage API para salvar os dados.

Cada aba (do menu do topo) corresponde a uma "proposta" que você pode vir a receber e você pode "navegar" através das propostas para compara-las.

Alguns valores que você coloca alteram outras entradas para manter a consistencia numérica, por exemplo: Se você diz que trabalha 7 horas por dia e 5 dias por semana, a ferramenta vai calcular que você trabalha 7 * 5 = 35 horas semanais e 35 * 4 = 120 horas mensais e vai colocar estes dados nos campos correspondentes.

Na questão do salário, você pode indicar o seu salário por hora, semana ou mês e os outros valores serão preenchidos de acordo.

Para esta ferramenta, cada ano tem 12 meses, cada mes tem 4 semanas e cada semana tem 7 dias, ou seja, cada ano tem 336 dias e 8.064 horas "trabalháveis".

# Agradecimentos

A ferramenta utiliza o [Material UI Design](https://material-ui.com/) desenvolvido pelo Google e implementado pela [biblioteca de componentes MDL](https://getmdl.io/) para facilitar o uso diretamente na web.

A funcionalidade da aplicação foi feita toda no frontend por javascript, o código é bem simples e inline. A funcionalidade foi inteiramente programada por Guilherme Rossato no decorrer de 5 horas.

Não me responsabilizo pelo uso incorreto da ferramenta, ela é apenas um experimento para ser usado de forma recreativa na hora de avaliar propostas de salário.

