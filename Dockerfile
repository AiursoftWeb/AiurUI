# ============================
# Prepare Build Environment
FROM hub.aiursoft.com/node:24-alpine AS npm-env
WORKDIR /src
COPY . .
RUN npm install --loglevel verbose
RUN npm run build

# ============================
# Prepare Runtime Environment
FROM hub.aiursoft.com/aiursoft/static
COPY --from=npm-env /src /data
