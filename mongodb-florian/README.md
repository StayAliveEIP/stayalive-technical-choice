# Index Note

## Single Index

_id: Index par default automatiquement crée

Create an index in NodeJS:
````js
collection.createIndex( { <key and index type specification> }, function(err, result) {
   console.log(result);
   callback(result);
}
````

### Indexing use B-Trees
Le B-Tree (arbre B) est une structure de données arborescente utilisée principalement pour le stockage et la recherche efficaces des données dans les bases de données et les systèmes de fichiers. Il est conçu pour être efficace dans la lecture et l'écriture des données sur un disque, en minimisant les accès disque nécessaires pour trouver une donnée spécifique.

## Multi Index

Réduction de la taille de l'index : L'utilisation d'un index composite peut réduire la taille totale de l'index, car les clés de l'index peuvent être partagées entre les différentes colonnes. Cela peut réduire la charge de stockage sur le disque et améliorer les performances de lecture et d'écriture.

Optimisation de la recherche : Si vous utilisez plusieurs index individuels, MongoDB peut avoir besoin de faire plusieurs recherches pour trouver les documents correspondants. Avec un index composite, MongoDB peut utiliser une seule recherche pour récupérer les documents correspondants. Cela peut réduire considérablement la durée des requêtes.

Meilleure performance : Lorsque vous interrogez une base de données en utilisant plusieurs critères, un index composite peut améliorer les performances de la requête. En utilisant un index composite, MongoDB peut identifier rapidement les documents qui correspondent à plusieurs critères, plutôt que de rechercher chaque critère individuellement.

Réduction de la fragmentation de l'index : Si vous utilisez plusieurs index individuels, il est possible que ces index soient fragmentés sur le disque, ce qui peut ralentir les opérations de lecture et d'écriture. En utilisant un index composite, vous pouvez réduire la fragmentation de l'index et améliorer les performances de votre base de données.

## Text index

Les index de type search, également appelés index textuels, sont des types d'index utilisés pour améliorer les performances de recherche de texte dans une base de données. Ces index sont généralement utilisés pour des requêtes de recherche de texte intégral qui impliquent des opérations de texte telles que la recherche de mots-clés, la correspondance approximative ou la recherche de phrases.

````javascript
collection.createIndex({ nom: 'text' });
````

# Change Stream

__see code changeStream.js__

# Sharding Note

Pour partitionner une collection, vous devez spécifier l'espace de noms complet de la collection que vous souhaitez partitionner et la clé de partition. Vous pouvez utiliser le
````bash
db.runCommand( { shardCollection: "<namespace>", key: <keyPattern> } )
````

Lorsque vous choisissez votre clé de partitionnement, pensez à :

le
cardinalité
de la clé fragmentée

le
fréquence
avec lesquelles les valeurs de clé de partition se produisent

si une clé de partition potentielle grandit
de manière monotone

Partage des modèles de requête

Limitations des clés de partition

<img src="https://geekflare.com/wp-content/uploads/2020/07/MongoDb-Sharding-Architecture.png">