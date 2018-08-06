# Como contribuir

Em primeiro lugar note que [temos algumas regras](https://db.fansubs.com.br/regras/). Você não precisa
ler todas elas, mas caso ocorra algum conflito sobre qualquer assunto elas estarão lá como referência.

Você pode colaborar comentando nas páginas de temporadas, issues e pull requests.

## Colaborando por comentários

Se encontrar algum erro em alguma temporada você pode comentar na página. O comentário será moderado e,
se for possível, o erro será corrigido.

## Colaborando por issues

Se encontrar qualquer problema - seja relativo a uma temporada ou não - você pode abrir uma issue. No momento
não temos um modelo para issues, porém tente seguir isso:

1. Use a pesquisa e/ou a lista de issues para tentar descobrir se alguém já reportou o mesmo problema;
2. Se não descreva o problema: "temporada X falta o anime Y", "no anime Z falta o grupo W", etc;
3. Aguarde uma resposta e se for necessário responda com mais informações;
4. Se for necessário enviar informações não permitidas pelas regras - como o link de algum site - você pode [usar PGP](https://keybase.io/encrypt#qgustavor).

Se possível escreva a issue em Português.

## Correções por pull requests

### Correções de dados de temporadas

Diferente do FansubDB todo o conteúdo do site é organizado em arquivos YAML. Caso queira contribuir por
comentários ou issues não é necessário editar ele, mas caso queira contribuir por pull requests só editar
os arquivos na pasta [`/_data/seasons`](https://github.com/qgustavor/fansubdb/tree/master/_data/seasons). O
arquivo [`2017-inverno.yml`](https://github.com/qgustavor/fansubdb/blob/master/_data/seasons/2017-inverno.yml),
que foi o primeiro a ser criado no site, tem todos os comentários e instruções necessárias para entender
como o sistema funciona.

A data usada nas postagens (para critério de ordem nos arquivos) será a data dos solstícios e equinócios
das estações (que é uma data bem próxima do início dos animes das temporadas).

### Inclusão de novas temporadas

Para a inclusão de novas temporadas proceda da seguinte forma:

1. Converta a página respectiva do The Fansub Database para YAML usando [essa ferramenta](https://gist.github.com/qgustavor/e9afafd3c2dece2c3cb0cb26b6a97c6c);
2. Corrija as informações que ficaram com erros na conversão;
3. Obtenha e verifique as informações das fansubs e preencha o YAML com elas;
4. Verifique as informações dos sites de streaming: [dicas nessa issue](https://github.com/qgustavor/fansubdb/issues/9);
5. Crie a imagem de thumbnail da temporada: pegue uma das thumbnails existentes e edite;
6. Crie a postagem no `_posts`: pegue uma das postagens existentes e edite;
7. Crie o commit e envie o pull request;

### Correções no código do site

Caso alguma alteração altere o código do site, como JavaScript ou SCSS, o código e os comentários nele deverão
estar em inglês. A mensagem nos commits deverá estar em Português. O título dos commits relacionados a código
e outras mudanças não relativas aos dados dos grupos deverão ser marcados com o emoji 🔧.
