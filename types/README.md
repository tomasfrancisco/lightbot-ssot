# Types

## Index

1. [Folder Structure](#folder-structure)
1. [File Naming](#file-naming)
1. [File Exporting](#file-exporting)
1. [Generic Naming](#generic-naming)
1. [Interfaces](#interfaces)
1. [Types](#types)
1. [Enums](#enums)

---

## Folder Structure
```
@lightbot
├── ...
└── types
    ├── README.md
    ├── index.ts
    └── intent
        ├── enums.ts
        ├── index.ts
        ├── output
        │   ├── index.ts
        │   ├── output.enums.ts
        │   └── output.types.ts
        ├── trigger
        │   ├── index.ts
        │   ├── trigger.enums.ts
        │   └── trigger.types.ts
        ├── types.ts
        └── validation.ts
```

## File Naming

The file naming follows the convention of `<subjectName>.<types | enums | interfaces>.ts`
For other files which doesn't provide any typings like `validation.ts` just follow the best readable and understandable naming.

## File Exporting

Each folder should export everything till the root `index.ts`. This will allow to catch naming overlaps soon.

## Generic Naming

Because we want to make sure our typings never collide with actual JS classes we prefer to add a suffix `Type` | `Enum` to all typings.
This way we make sure we make a difference between what is an object and what is a class.

## Interfaces

Interfaces should follow the following naming convention **only** when defining methods:

`I<InterfaceName>`

otherwise should follow the convention of [Types](#types).

e.g.:
```ts
interface BarType<T> {
  y: T;
  z: T;
}

interface IImplementable {
  giveMoney(): number;
}
```

## Types

Types should follow the following naming convention:

`<TypeName>Type`


## Enums

Enums should follow the following naming convention:

`<EnumName>Enum`
