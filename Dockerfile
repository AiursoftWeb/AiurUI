# ============================
# Prepare Build Environment
FROM hub.aiursoft.cn/node:21-alpine AS npm-env
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

# ============================
# Prepare Runtime Environment
FROM hub.aiursoft.cn/aiursoft/static
COPY --from=npm-env /src /data
