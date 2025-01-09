import fs from 'fs';
import yaml from 'js-yaml';

import path from 'path';

interface OpenApiPathItem {
  [operation: string]: OpenApiOperation;
}

interface OpenApiOperation {
  summary?: string;
  tags?: string[];
  responses?: {
    [status: string]: {
      description: string;
      content?: {
        [mediaType: string]: {
          schema?: {
            type?: string;
            properties?: { [property: string]: OpenApiSchema };
          };
        };
      };
    };
  };
  parameters?: OpenApiParameter[];
  requestBody?: {
    description?: string;
    required?: boolean;
    content?: {
      [mediaType: string]: {
        schema?: OpenApiSchema;
      };
    };
  };
}

interface OpenApiParameter {
  in: string;
  name: string;
  required?: boolean;
  schema?: OpenApiSchema;
  description?: string;
}

interface OpenApiSchema {
  type?: string;
  properties?: { [property: string]: OpenApiSchema };
}

interface OpenApiComponents {
  schemas?: { [name: string]: OpenApiSchema };
  parameters?: { [name: string]: OpenApiParameter };
  // Dodaj inne sekcje components według potrzeb
}

interface OpenApiDocument {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  servers: {
    url: string;
  }[];
  paths: {
    [path: string]: OpenApiPathItem;
  };
  components?: OpenApiComponents;
}

// interface OpenApiSchema {
//   openapi: string;
//   info: {
//     title: string;
//     version: string;
//   };
//   servers: {
//     url: string;
//   }[];
//   paths: {
//     [path: string]: object;
//   };
//   components: {
//     [component: string]: object;
//   };
// }

function mergePaths(dirs: string[]): any {
  const mergedPaths = yaml.load(fs.readFileSync('../swagger.yaml', 'utf8')) as OpenApiDocument;
  console.log(mergedPaths);

  mergedPaths.paths = {};
  mergedPaths.components?.schemas = {};
  console.log(mergedPaths);

  dirs.forEach((dir) => {
    const dirname = path.basename(dir);
    console.log(dir);

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fileContent: object = yaml.load(fs.readFileSync(dir + file, 'utf8')) as object;

      if (dirname === 'paths') {
        mergedPaths.paths = { ...mergedPaths.paths, ...fileContent };
      } else {
        mergedPaths.components = { ...mergedPaths.components, ...fileContent };
      }
    }
  });

  // console.log(mergedPaths);

  return mergedPaths;
}

const pathDirs = ['../openapi/paths/', '../openapi/components/'];
const mergedOpenAPI = mergePaths(pathDirs);
// console.log(yaml.stringify(mergedOpenAPI));
fs.writeFileSync('merged_openapi.yaml', yaml.dump(mergedOpenAPI));

export default mergedOpenAPI;
