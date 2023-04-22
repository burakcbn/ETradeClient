export class Dynamic {
   filter: Filter[];
   sort: Sort[];
}
export class Filter {
   field: string;
   operator: string;
   value: string;
   logic: string;
}
export class Sort {
   field: string;
   dir: string;
}