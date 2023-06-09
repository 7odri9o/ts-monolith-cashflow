ARG DOCKER_IMAGE_VERSION

FROM ${DOCKER_IMAGE_VERSION} AS builder

WORKDIR /build

COPY ["package.json", "pnpm-lock.yaml", "tsconfig.json", "tsconfig.build.json", "nest-cli.json", "./"]

RUN npm install -g pnpm
RUN pnpm install --ignore-scripts

COPY src src
COPY prisma prisma

RUN pnpm prisma:generate
RUN pnpm build

FROM ${DOCKER_IMAGE_VERSION}

WORKDIR /usr/src/app

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/prisma ./prisma

RUN npm install -g pnpm

CMD [ "pnpm", "start:migrate:prod" ]